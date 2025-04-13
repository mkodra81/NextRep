import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    settingName: { type: String, required: true },
    settingValue: { type: String, required: true },
    description: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdminSettings", adminSettingsSchema);