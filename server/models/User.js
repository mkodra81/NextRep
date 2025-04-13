import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' },

  gender: String,
  age: Number,
  height: Number,
  weight: Number,
  bodyFat: Number,
  bodyType: String,
  injuries: String,
  motivation: String,
  trainingExperience: String,
  trainingDaysPerWeek: Number,
  trainingDuration: Number,  
  focusedAreas: [String],
  bodySplit: String,

  dietaryPreferences: [{ type: String }], // e.g., ['Vegetarian', 'Pescatarian']
  allergiesOrRestrictions: [{ type: String }], // e.g., ['Gluten', 'Peanuts']
  dislikes: [{ type: String }], // foods user dislikes
  favoriteFoods: [{ type: String }], // for personalization
  numberOfMealsPerDay: { type: Number, default: 3 },
  intermittentFasting: { type: Boolean, default: false },
  sleepHours: { type: Number }, // optional, helps with recovery-based diets
  dailyWaterIntakeLiters: { type: Number }, // optional
  medicalConditions: [{ type: String }],

  weightGoal: Number,
  bodyTypeGoal: String,
  fitnessGoal: String,
  verified: { type: Boolean, default: false },

  isSubscribed: { type: Boolean, default: false },
  stripeCustomerId: String,
  timezone: String,

  // Engagement
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastLoginDate: Date,
  badges: [String], // Array of badge names

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
