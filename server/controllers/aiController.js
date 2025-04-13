import { generateResponse } from "../services/genemiAIService.js";

const generatePlan = async (req, res) => {
  try {
    const user = req.body;
    const { type } = req.params; // Get the type from the request parameters
    const plan = await generateResponse(user, type); // Pass the type to the AI service

    if (typeof plan !== "object" || plan === null) {
      return res.status(500).json({ error: "Invalid response from AI service" });
    } 
   
    res.status(200).json({ plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
}

export { generatePlan };