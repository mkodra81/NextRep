import mongoose from "mongoose";

const xpLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    actionType: {
      type: String,
      enum: [
        "workout",
        "nutrition",
        "goal",
        "plan",
        "profile",
        "subscription",
        "streak",
        "badge",
      ],
      required: true,
    },
    xpAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    },  {
    timestamps: true,
  }
);

export default mongoose.model("XpLog", xpLogSchema);