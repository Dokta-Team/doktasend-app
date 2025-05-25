import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server-auth";
import Recipient from "@/app/(models)/Recipients";
import User from "@/app/(models)/User";

export async function POST(req) {
  try {
    // Get user from custom auth
    const user = await getCurrentUser();

    if (!user || !user.name) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Extract sponsor ID from user
    const sponsorName = user.name;
    // Parse request body (excluding sponsorId)
    const { userData } = await req.json();

    // Validate required fields
    if (
      !userData.recipientName ||
      !userData.dateOfBirth ||
      !userData.address ||
      !userData.phone
    ) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check if sponsor exists in the database
    const sponsor = await User.findOne({ name: sponsorName });
    if (!sponsor) {
      return NextResponse.json(
        { message: "Sponsor not found" },
        { status: 404 }
      );
    }

    // Create new recipient
    const newRecipient = {
      name: userData.recipientName,
      dateOfBirth: userData.dateOfBirth,
      address: userData.address,
      phone: userData.phone,
      sponsor: sponsor,
      plan: userData.plan || "GOLD",
    };

    await Recipient.create(newRecipient);

    return NextResponse.json(
      { message: "Recipient created successfully", recipient: newRecipient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Recipient registration error:", error);
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}
