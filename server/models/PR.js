import mongoose from 'mongoose';

const prSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exerciseName: String,
  weight: Number,
  reps: Number,
  date: { type: Date, default: Date.now },
});

prSchema.index({ user: 1, exercise: 1, date: -1 }, { unique: true });

export default mongoose.model('PR', prSchema);
