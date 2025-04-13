import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  weight: Number,
  bodyFat: Number,
  notes: String,
});

progressSchema.index({ user: 1, date: -1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
