import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otp from "@/app/(models)/OTP"; // Import the User model

async function generateVerificationToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    // Replace with your email service configuration
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email to sign up",
    text: `Your verification token is: ${token}. Please enter this token on the signup page to complete your registration.`,
    html: `<p>Your verification token is: <b>${token}</b>. Please enter this token on the signup page to complete your registration.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // const user = await User.findOne({ email });

    // if (!user) {
    //   // If user doesn't exist, you might want to handle this differently
    //   // depending on your signup flow (e.g., create a pending user)
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    const verificationToken = await generateVerificationToken();
    const verificationTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    await sendVerificationEmail(email, verificationToken);
    const newOtp = new otp({
      email: email,
      otp: verificationToken,
      expiresAt: verificationTokenExpiry,
    });
    await newOtp.save();
    return NextResponse.json(
      { message: "Verification token sent to email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending verification token:", error);
    return NextResponse.json(
      { error: "Failed to send verification token" },
      { status: 500 }
    );
  }
}
