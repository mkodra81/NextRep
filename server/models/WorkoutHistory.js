import mongoose from 'mongoose';

const workoutHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    duration: Number, // in minutes
    exercises: [],
    notes: String,
    completed: Boolean
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('WorkoutHistory', workoutHistorySchema);
