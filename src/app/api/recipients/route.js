import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Recipient from "@/app/(models)/Recipients";
import User from "@/app/(models)/User";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(options);

    // Ensure user is authenticateds
    console.log(session);
    if (!session || !session.user || !session.user.name) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Extract sponsor ID from session
    const sponsorName = session.user.name;
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
      sponsor: sponsor, // Assigned from session - now using name
      plan: userData.plan || "GOLD", // Default plan if not provided
    };

    await Recipient.create(newRecipient);

    return NextResponse.json(
      { message: "Recipient created successfully", recipient: newRecipient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Recipient registration error:", error); // Log the detailed error
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}
