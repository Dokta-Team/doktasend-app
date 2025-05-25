import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server-auth";
import Recepient from "@/app/(models)/Recipients";
import User from "@/app/(models)/User";

export async function GET(req, res) {
  const user = await getCurrentUser();

  if (!user || !user.name) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let userName = user.name || "Guest";
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
