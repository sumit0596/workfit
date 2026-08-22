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
      subject: "Reset your ActiveX Gym password",
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background-color:#FAF6F3; font-family: Arial, Helvetica, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6F3; padding: 40px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%; background-color:#FFFFFF; border-radius:16px; overflow:hidden; border:1px solid #EDE2DE;">

              <!-- Header banner -->
              <tr>
                <td style="background: linear-gradient(135deg, #4A2C4E, #DF6C76); background-color:#4A2C4E; padding: 32px 32px 28px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td valign="middle" width="44">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="40" height="40" align="center" valign="middle" style="background-color:#F2C14E; border-radius:10px; font-size:18px; font-weight:bold; color:#4A2C4E; font-family: Arial, sans-serif;">N</td>
                          </tr>
                        </table>
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <span style="color:#FFFFFF; font-size:17px; font-weight:bold; letter-spacing:-0.2px;">ActiveX Gym</span><br/>
                        <span style="color:#F2C14E; font-size:11px; font-weight:600; letter-spacing:0.05em;">FITNESS TRACKER</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 36px 32px 8px;">
                  <p style="margin:0 0 6px; color:#DF6C76; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">Password Reset</p>
                  <h1 style="margin:0 0 16px; color:#2A2230; font-size:22px; font-weight:700; line-height:1.3;">Let's get you back in</h1>
                  <p style="margin:0 0 24px; color:#5A4F55; font-size:15px; line-height:1.6;">
                    We received a request to reset the password for your ActiveX Gym account. Click the button below to choose a new one.
                  </p>
                </td>
              </tr>

              <!-- CTA button -->
              <tr>
                <td style="padding: 0 32px 28px;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="border-radius:9px; background-color:#DF6C76;">
                        <a href="${resetUrl}" target="_blank" style="display:inline-block; padding:14px 32px; font-size:15px; font-weight:700; color:#FFFFFF; text-decoration:none; border-radius:9px;">
                          Reset Password
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Fallback link -->
              <tr>
                <td style="padding: 0 32px 28px;">
                  <p style="margin:0; color:#9A8D93; font-size:12px; line-height:1.6;">
                    Button not working? Copy and paste this link into your browser:<br/>
                    <a href="${resetUrl}" style="color:#DF6C76; word-break:break-all;">${resetUrl}</a>
                  </p>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding: 0 32px;">
                  <hr style="border:none; border-top:1px solid #EDE2DE; margin:0;" />
                </td>
              </tr>

              <!-- Footer note -->
              <tr>
                <td style="padding: 24px 32px 32px;">
                  <p style="margin:0 0 6px; color:#9A8D93; font-size:12px; line-height:1.6;">
                    This link expires in <strong style="color:#5A4F55;">1 hour</strong> for your security.
                  </p>
                  <p style="margin:0; color:#9A8D93; font-size:12px; line-height:1.6;">
                    Didn't request this? You can safely ignore this email — your password won't change.
                  </p>
                </td>
              </tr>

            </table>

            <!-- Outer footer -->
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%;">
              <tr>
                <td align="center" style="padding: 20px 16px;">
                  <p style="margin:0; color:#B5A8AE; font-size:11px;">© ${new Date().getFullYear()} ActiveX Gym. All rights reserved.</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "If that email is in our database, we will send a reset link." }, { status: 200 });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
