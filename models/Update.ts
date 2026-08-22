import mongoose from "mongoose";

const UpdateSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sha: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Update || mongoose.model("Update", UpdateSchema);
