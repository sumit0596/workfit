// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";


export async function POST(req: Request) {
  try {
   
    const { fname, lname, email, password } = await req.json();

    // 1. Basic validation
    if (!fname || !lname || !email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Connect to DB
    await connectToDatabase();

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // 4. Hash the password securely (never save plain text passwords)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create and save the new user
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}