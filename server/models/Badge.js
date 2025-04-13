import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    badgeName: { type: String, required: true },
    dateAchieved: { type: Date, default: Date.now },
    description: String,
    icon: String, // URL or path to the badge icon
  },
  {
    timestamps: true,
  }
);