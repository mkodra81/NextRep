import mongoose from 'mongoose';

const aiRecommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['planExplanation', 'exerciseReplacement', 'progressAnalysis', 'weeklyGoal'] },
  inputContext: String,
  recommendation: String,
});

aiRecommendationSchema.index({ user: 1, date: -1 }, { unique: true });

export default mongoose.model('AIRecommendation', aiRecommendationSchema);
