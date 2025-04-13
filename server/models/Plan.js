import mongoose from "mongoose";

// Exercise schema
const ExerciseSchema = new mongoose.Schema(
  {
    exercise: { type: String, required: true },
    sets: { type: Number, required: true },
    repRange: { type: String, required: true },
    restPeriod: { type: Number, required: true },
    notes: { type: String },
  },
  { _id: false }
);

// Workout detail per day
const WorkoutDetailSchema = new mongoose.Schema(
  {
    warmUp: { type: String },
    mainWorkout: [ExerciseSchema],
    coolDown: { type: String },
  },
  { _id: false }
);

// Weekly workout structure
const WeeklyWorkoutPlanSchema = new mongoose.Schema(
  {
    schedule: {
      Monday: { type: String },
      Tuesday: { type: String },
      Wednesday: { type: String },
      Thursday: { type: String },
      Friday: { type: String },
      Saturday: { type: String },
      Sunday: { type: String },
    },
    workoutDetails: {
      type: Map,
      of: WorkoutDetailSchema,
      required: true,
    },
    cardio: {
      reccommendation: { type: String },
      example: { type: String },
    },
    progressiveOverload: { type: String },
    considerations: { type: String },
    disclaimer: { type: String },
  },
  { _id: false }
);

// Macronutrient breakdown
const MacronutrientSchema = new mongoose.Schema(
  {
    protein: String,
    carbs: String,
    fats: String,
  },
  { _id: false }
);

// Meal schema
const MealSchema = new mongoose.Schema(
  {
    mealName: { type: String, required: true },
    dishName: { type: String, required: true },
    ingredients: [String],
    preparationMethod: { type: String },
    estimatedCalories: { type: Number },
    macronutrientBreakdown: MacronutrientSchema,
  },
  { _id: false }
);

// Daily diet schema
const DailyDietSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    meals: [MealSchema],
  },
  { _id: false }
);

// Full diet plan schema
const WeeklyDietPlanSchema = new mongoose.Schema(
  {
    dietDetails: [DailyDietSchema],
    dailyCalorieTarget: { type: String },
    macronutrientRatio: { type: String },
    hydrationRecommendation: { type: String },
    progressTracking: { type: String },
    supplementSuggestions: { type: String },
    disclaimer: { type: String },
  },
  { _id: false }
);

// Master Plan Schema
const planSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weekOf: { type: Date, required: true },
    weeklyWorkoutPlan: WeeklyWorkoutPlanSchema,
    weeklyDietPlan: WeeklyDietPlanSchema,
  },
  { timestamps: true }
);

planSchema.index({ user: 1, weekOf: 1 }, { unique: true });

export default mongoose.model("Plan", planSchema);
