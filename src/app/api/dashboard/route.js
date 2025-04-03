import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import Recepient from "@/app/(models)/Recipients"; // Import the Recipient model
import User from "@/app/(models)/User"; // Import the User model

export async function GET(req, res) {
  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.name) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let userName = session.user.name || "Guest"; // Get user name from session or default
  const sponsorId = await User.findOne({ name: userName });
  try {
    // Fetch recipients from the database, filtered by sponsor ID
    const recipients = await Recepient.find({ sponsor: sponsorId }).populate(
      "sponsor",
      "name"
    );
    return NextResponse.json({ recipients, userName });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
