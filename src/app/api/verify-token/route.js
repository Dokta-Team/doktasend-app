import { NextResponse } from "next/server";
import otp from "@/app/(models)/OTP";

export async function POST(request) {
  try {
    const { userData, token } = await request.json();
    const email = userData.email;
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }
    const otpRecord = email ? await otp.findOne({ email }) : null;

    if (!otpRecord || otpRecord.otp !== token) {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 });
    }
    // Delete the OTP record after successful verification
    await otp.deleteOne({ email });

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
