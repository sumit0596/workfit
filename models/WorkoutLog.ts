import mongoose, { Schema, model, models } from "mongoose";

const WorkoutLogSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  setNumber: {
    type: Number,
    required: true,
  },
  resistance: {
    type: String,
    default: "-",
  },
  stance: {
    type: String,
    default: "-",
  },
  reps: {
    type: Number,
    required: true,
  },
  target: {
    type: String,
    default: "",
  },
  rpe: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  status: {
    type: String,
    enum: ["GOAL MET", "BUILD", ""],
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    required: true, // Will store formatted date like "Aug 20"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WorkoutLog = models.WorkoutLog || model("WorkoutLog", WorkoutLogSchema);

export default WorkoutLog;
