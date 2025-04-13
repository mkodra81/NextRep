import { GoogleGenAI } from "@google/genai";
import { workoutPrompt, dietPrompt } from "../utils/GeminiPrompts.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export async function generateResponse(user, type) {
  console.log(type);
  const formattedFocusAreas = Array.isArray(user.focusAreas)
    ? user.focusAreas.join(", ")
    : user.focusAreas || "Not specified"; // Handle if not an array or missing
  const formattedInjuries = user.injuries || "None specified";
  const formattedBodyFat =
    user.bodyFat !== undefined && user.bodyFat !== null
      ? `${user.bodyFat}%`
      : "Not specified";
  const formattedBodyType = user.bodyType || "Not specified";
  const formattedWaterIntake =
    user.waterIntake !== undefined && user.waterIntake !== null
      ? `${user.waterIntake}`
      : "Not specified"; // Add units if available in user object later
  const formattedSleepQuality = user.sleepQuality || "Not specified";
  const formattedBodySplit = user.bodySplit || "Open to suggestions";
  const formattedWeightGoal =
    user.weightGoal !== undefined && user.weightGoal !== null
      ? `${user.weightGoal}`
      : "Not specified"; // Add units if available
  const formattedBodyTypeGoal = user.bodyTypeGoal || "Not specified";

  const promptText = `
**Objective:** Generate a comprehensive, personalized, and actionable weekly ${
    type === "workout" ? "workout" : "diet"
  } plan based on the user's specific details, goals, and preferences.The *entire output* must be a single, valid JSON object only containing the plan (DO NOT INCLUDE USER INFO), adhering strictly to the specified structure and format. Do not include any additional text or explanations outside of the JSON object. 

**User Details:**

*   **Name:** ${user.name}
*   **Gender:** ${user.gender}
*   **Age:** ${user.age}
*   **Height:** ${
    user.height
  } (*Developer Note: Please add units like 'cm' or 'ft/in' to the user data if possible*)
*   **Weight:** ${
    user.weight
  } (*Developer Note: Please add units like 'kg' or 'lbs' to the user data if possible*)
*   **Body Fat % (Approximate):** ${formattedBodyFat}

${
  type === "workout"
    ? `*   **Perceived Body Type:** ${formattedBodyType} (e.g., Ectomorph, Mesomorph, Endomorph, or description like 'Slim', 'Athletic', 'Heavier set')
*   **Current Injuries/Limitations:** ${formattedInjuries} (Be specific, e.g., 'Lower back pain (mild)', 'Right shoulder impingement (recovering)', 'None')
*   **Training Experience:** ${user.trainingExperience} (e.g., Beginner <6 months, Intermediate 6 months - 2 years, Advanced 2+ years consistent training)
*   **Available Training Days Per Week:** ${user.trainingDaysPerWeek}
*   **Desired Training Duration Per Session (Minutes):** ${user.trainingDuration} minutes
*   **Average Daily Water Intake:** ${formattedWaterIntake} (*Developer Note: Please add units like 'Liters' or 'Gallons/Ounces' to the user data if possible*)
*   **Average Sleep Quality:** ${formattedSleepQuality} (e.g., Excellent, Good, Fair, Poor - include average hours if possible)
*   **Primary Focus Areas:** [${formattedFocusAreas}] (List specific muscle groups or fitness aspects)
*   **Preferred Training Split:** ${formattedBodySplit} (e.g., Full Body, Upper/Lower, Push/Pull/Legs (PPL), Bro Split, Body Part per Day, User is open to suggestions)
*   **Primary Fitness Goal:** ${user.fitnessGoal} (e.g., Muscle Gain/Hypertrophy, Fat Loss, Strength Gain, Improve Cardiovascular Health, General Fitness, Body Recomposition)
*   **Target Weight (Optional):** ${formattedWeightGoal} (*Developer Note: Please add units like 'kg' or 'lbs' to the user data if possible*)
*   **Desired Body Type/Composition Goal:** ${formattedBodyTypeGoal} (e.g., Leaner, More Muscular, Toned, Athletic Build)
${workoutPrompt}
`
    : `*   **Dietary Preferences:** ${user.dietaryPreferences} (e.g., Vegetarian, Vegan, Keto, Paleo, High Protein, Low Carb, etc.  If none, state 'None')
*   **Food Allergies/Restrictions:** ${user.allergiesOrRestrictions} (e.g., Gluten-Free, Dairy-Free, Nut-Free, etc. If none, state 'None')
*   **Food Dislikes:** ${user.dislikes} (List foods to avoid in the diet plan)
*   **Favorite Foods:** ${user.favoriteFoods} (List foods to include to improve adherence)
*   **Number of Meals Per Day:** ${user.numberOfMealsPerDay} (e.g., 3, 4, 5)
*   **Intermittent Fasting (Yes/No):** ${user.intermittentFasting} (If yes, specify the fasting window, e.g., 16/8)
*   **Medical Conditions:** ${user.medicalConditions} (List any relevant medical conditions, or state "None")
${dietPrompt}`
}

**Generate the detailed workout plan now based strictly on the user details provided above.**
`; // End of promptText template literal

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${promptText}`,
      parameters: {
        temperature: 0.7,
        maxOutputTokens: 1500,
        topP: 1.0,
        topK: 40,
      },
    });

    const raw = response.text.replace(/^```json\n/, "").replace(/\n```$/, "");

    // 2. Parse the remaining string as JSON
    const parsedPlan = JSON.parse(raw);
    
    return parsedPlan;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
}
