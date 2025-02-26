import { NextResponse } from "next/server";
import Recepient from "@/app/(models)/Recepient";
import User from "@app/(models)/User";

export async function POST(req) {
  try {
    const { recipientName, dateOfBirth, address, phone, plan, sponsorId } = await req.json();

    if (!recipientName || !dateOfBirth || !address || !phone || !sponsorId) {
      return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 });
    }

    const sponsor = await User.findById(sponsorId);
    if (!sponsor) {
      return NextResponse.json({ message: "Sponsor not found" }, { status: 404 });
    }

    const newRecepient = new Recepient({
      name: recipientName,
      dateOfBirth,
      address,
      phone,
      sponsor: sponsorId,
      plan: plan || "GOLD", // Default plan if not provided
    });

    await User.create(newRecepient)

    return NextResponse.json({ message: "Recipient created successfully", recipient: newRecepient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
