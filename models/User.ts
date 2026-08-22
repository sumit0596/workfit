// models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  fname: {
    type: String,
    required: [true, "First name is required"],
  },
  lname: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensures no duplicate emails
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
    required: false,
  }
});

// In Next.js, we must check if the model is already compiled to avoid overwriting errors during hot reloads
const User = models.User || model("User", UserSchema);

export default User;