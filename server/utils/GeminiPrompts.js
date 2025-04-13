const dietPrompt = `**Instructions for Diet Plan Generation**

1.  **Personalization:**
  *   Tailor the entire plan specifically to ALL the user's provided information (age, gender, height, weight, body fat,   dietary preferences, allergies, medical conditions, fitness goal, training routine, etc.).
  *Consider their daily schedule, meals per day, intermittent fasting, dislikes, and favorite foods to maximize adherence.

2.  **Structure:**
  *   Provide a 7-day meal plan.
  *   For each day, include exactly the number of meals specified in numberOfMealsPerDay.
  *   Include specific portion sizes, estimated calorie count, and macronutrient breakdown (Protein / Carbs / Fats) for each  meal.
  *   Align total daily calories and macros to support the user's fitnessGoal and weightGoal.

3.  **Daily Meal Breakdown:**
  *   **For each meal, provide:**
      *   Meal Name (e.g., "Breakfast", "Lunch", "Snack", etc.)
      *   Dish/Recipe Name
      *   List of Ingredients (with simple quantities)
      *   Preparation Method (briefly)
      *   Estimated Calories + Macros
      *   Vary meals throughout the week to prevent monotony and encourage compliance.

4.  **Nutritional Strategy:**
  *   Base caloric targets and macros on the user's body composition, activity level, and fitnessGoal:
  *   For fat loss, include a modest caloric deficit and prioritize protein and fiber.
  *   For muscle gain, include a mild caloric surplus with high protein and balanced carbs.
  *   For recomposition or maintenance, aim for balanced macronutrients.
  *   If intermittentFasting is true, condense meals into an 8-hour eating window and adjust meal timing accordingly.

5.  **Preferences & Restrictions:**

  *   Strictly exclude any food in allergiesOrRestrictions and dislikes.
  *   Respect any listed dietaryPreferences (e.g., Vegetarian, Vegan, Pescatarian).
  *   Incorporate favoriteFoods where possible, especially in snacks or flexible meals.
6.  **Lifestyle Factors:
  *   Adjust calorie and meal timing strategies to support the user's:
  *   trainingDaysPerWeek and trainingDuration (e.g., more carbs around workouts)
  *   sleepHours (e.g., consider evening carbs for better sleep)
  *   dailyWaterIntakeLiters (ensure hydration cues throughout the day)
  *   medicalConditions (e.g., PCOS, diabetes, digestive issues—adapt meals accordingly)
  *   If beneficial and safe, suggest basic supplements (e.g., whey protein, creatine, omega-3s, multivitamins).
  *   Include only if it adds value based on user data.
7.  **Progress & Adjustments:
  *   Briefly explain how the user should track their progress (e.g., weekly weight check-ins, energy levels, adherence).
  *   Encourage slight adjustments every 2–4 weeks based on how their body responds.
8.  **Disclaimer:
  *   "This meal plan is for informational purposes only. Please consult with a registered dietitian or healthcare provider before starting any new diet, especially if you have allergies, medical conditions, or are taking medication."

Follow this specific format for the JSON output:
  
  {
    "dietDetails": [
      "day": "Day Name",
      "meals": [
          {
            "mealName": "Breakfast",
            "dishName": "Dish Name",
            "ingredients": ["Ingredient 1", "Ingredient 2"],
            "preparationMethod": "Preparation method",
            "estimatedCalories": 500,
            "macronutrientBreakdown": {
              "protein": 30,
              "carbs": 50,
              "fats": 20
            }
          },
          // Repeat for other meals
        ]
      },
    ],
    dailyCalorieTarget: "Total daily calories",
    macronutrientRatio: "Macronutrient breakdown (e.g., 40% Protein, 30% Carbs, 30% Fats)",
    hydrationRecommendation: "Daily water intake recommendation (e.g., 2-3 liters)",
    progressTracking: "Progress tracking method (e.g., weekly weigh-ins, energy levels)",
    supplementSuggestions: "Supplement suggestions (if any)",
    disclaimer: "Disclaimer text",
    }
  }
`;

const workoutPrompt = `**Instructions for Workout Plan and Diet Plan Generation:**

1.  **Personalization:** Tailor the entire plan specifically to ALL the user's details provided above (age, gender, experience, injuries, goals, available time, focus areas, etc.).Consider their daily schedule, meals per day, intermittent fasting, dislikes, and favorite foods to maximize adherence and enjoyment.
2.  **Structure:**
  *   Provide a clear weekly schedule outlining specific workout days and rest days based on \`trainingDaysPerWeek\`.
  *   Align the workout structure with the specified \`trainingDaysPerWeek\` and \`bodySplit\`. If \`bodySplit\` is 'Open to suggestions', recommend and implement the most suitable split based on the user's goals, experience, and available days.
3.  **Detailed Daily Workouts:** For EACH workout day:
  *   **Warm-up:** Include a specific 5-10 minute dynamic warm-up routine (list example exercises like leg swings, arm circles, cat-cow).
  *   **Main Workout:**
      *   List specific exercises targeting the designated muscle groups for that day according to the chosen split.
      *   Prioritize compound movements where appropriate, supplemented by isolation exercises targeting the \`focusAreas\`.
      *   Specify the exact number of **Sets** per exercise.
      *   Specify the exact **Rep Range** (e.g., 8-12 for hypertrophy, 4-6 for strength, 15+ for endurance). Base this on the \`fitnessGoal\`.
      *   Specify the **Rest Period** between sets in seconds (e.g., 60-90 seconds). Adjust based on goals and intensity.
      *   Ensure the total workout duration (including warm-up and cool-down) aligns reasonably with the \`trainingDuration\`. Provide estimated timing if possible.
  *   **Cool-down:** Include a specific 5-10 minute cool-down routine (list example static stretches for muscles worked).
4.  **Exercise Selection:**
  *   Choose exercises appropriate for the user's stated \`trainingExperience\`.
  *   **CRUCIAL:** If \`injuries\` are listed, provide specific modifications or alternative exercises for any movement that might aggravate them. If injuries are 'None specified', include standard safety cues for common exercises.
  *   Ensure the \`focusAreas\` are adequately addressed through exercise selection or additional volume (sets/reps).
5.  **Cardio Recommendations:** Include specific cardio recommendations (type, frequency, duration, intensity - e.g., '3 days/week, 30 mins moderate intensity incline walking' or '2 days/week, 20 mins HIIT on stationary bike'). Tailor this to the \`fitnessGoal\` and integrate it logically into the weekly schedule (e.g., on rest days, after weights).
6.  **Progressive Overload:** Briefly explain a simple, actionable strategy for the user to implement progressive overload (e.g., "When you can complete all sets and reps for an exercise with good form, increase the weight slightly in the next session").
7.  **Considerations:** Briefly mention how optimizing \`sleepQuality\` and \`waterIntake\` supports the plan.
8.  **Tone:** Present the plan in a clear, organized, encouraging, and easy-to-follow format.
9.  **Disclaimer:** Include a standard disclaimer: "Consult with a healthcare professional or certified trainer before starting any new workout program, especially if you have pre-existing conditions or injuries." 

Follow this specific format for the JSON output:

{
  "weeklyWorkoutPlan": {
    "schedule": {
      "Monday": "Workout Name/Rest",
      "Tuesday": "Workout Name/Rest",
      "Wednesday": "Workout Name/Rest",
      "Thursday": "Workout Name/Rest",
      "Friday": "Workout Name/Rest",
      "Saturday": "Workout Name/Rest",
      "Sunday": "Workout Name/Rest"
    },
    "workoutDetails": {
      "Workout Name": {
      "warmUp": "Warm-up exercises",
      "mainWorkout": [
        {
          "exercise": "Exercise Name",
          "sets": 3,
          "repRange": "8-12",
          "restPeriod": 60,
          "notes": "Any specific notes or modifications"
        }
      ],
      "coolDown": "Cool-down exercises",
    },
    },
    "cardio": {
      "recommendation": "Cardio recommendation",
      "example": "Example cardio workout"
    },
    "progressiveOverload": "Progressive overload strategy",
    "considerations": "Considerations for sleep and hydration",
  "disclaimer": "Disclaimer text"
  }
}

`;

export { dietPrompt, workoutPrompt };
