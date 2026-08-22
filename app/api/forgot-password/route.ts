import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      // Return 200 even if user not found to prevent email enumeration
      return NextResponse.json({ message: "If that email is in our database, we will send a reset link." }, { status: 200 });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // Save token and expiration to user (1 hour from now)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"ActiveX Gym" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6a1b9a;">ActiveX Gym</h2>
          <h3>You requested a password reset</h3>
          <p>Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #f7a072; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px; margin-bottom: 20px;">Reset Password</a>
          <br/>
          <p style="font-size: 12px; color: #777;">This link is valid for 1 hour.</p>
          <p style="font-size: 12px; color: #777;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "If that email is in our database, we will send a reset link." }, { status: 200 });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
