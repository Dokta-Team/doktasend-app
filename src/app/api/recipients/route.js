import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/authOptions"; // Ensure this points to your NextAuth config
import Recepient from "@/app/(models)/Recipients";
import User from "@/app/(models)/User";

export async function POST(req) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(req);

    // Ensure user is authenticated
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract sponsor ID from session
    const sponsorId = session.user.id;

    // Parse request body (excluding sponsorId)
    const { recipientName, dateOfBirth, address, phone, plan } = await req.json();

    // Validate required fields
    if (!recipientName || !dateOfBirth || !address || !phone) {
      return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 });
    }

    // Check if sponsor exists in the database
    const sponsor = await User.findById(sponsorId);
    if (!sponsor) {
      return NextResponse.json({ message: "Sponsor not found" }, { status: 404 });
    }

    // Create new recipient
    const newRecipient = new Recepient({
      name: recipientName,
      dateOfBirth,
      address,
      phone,
      sponsor: sponsorId, // Assigned from session
      plan: plan || "GOLD", // Default plan if not provided
    });

    await newRecipient.save();

    return NextResponse.json(
      { message: "Recipient created successfully", recipient: newRecipient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Recipient registration error:", error); // Log the detailed error
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
