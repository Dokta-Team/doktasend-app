import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
// In-memory storage for tokens (replace with database in production)
import { verificationTokens } from "../send-verification-token/route"; // Assuming you'll export it

export async function POST(request) {
  try {
    const { userData, token } = await request.json();

    if (!userData.email || !token) {
      return NextResponse.json(
        { error: "Email and token are required" },
        { status: 400 }
      );
    }
    //Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const storedToken = verificationTokens[userData.email];
    console.log(userData.email);
    if (!storedToken || storedToken !== token) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 401 }
      );
    }

    // Token is valid, you might want to remove it from in-memory storage after verification
    delete verificationTokens[userData.email];
    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;
    await User.create(userData);
    return NextResponse.json(
      { message: "User Created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 500 }
    );
  }
}
