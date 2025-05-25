import { NextResponse } from "next/server";
import Recipient from "@/app/(models)/Recipients";
import User from "@/app/(models)/User";
import mongoose from "mongoose";
import { getCurrentUser } from "@/lib/server-auth";

mongoose.connect(process.env.MONGODB_URI);

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { username, recipientId } = resolvedParams;

    // Auth check: only allow access if current user matches username
    const user = await getCurrentUser();
    if (!user || user.name !== username) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(recipientId)) {
      return NextResponse.json(
        { message: "Invalid recipientId" },
        { status: 400 }
      );
    }

    const sponsorUser = await User.findOne({ name: username });
    if (!sponsorUser) {
      return NextResponse.json(
        { message: "Sponsor not found" },
        { status: 404 }
      );
    }

    const recipient = await Recipient.findById(recipientId).populate("sponsor");

    if (!recipient) {
      return NextResponse.json(
        { message: "Recipient not found" },
        { status: 404 }
      );
    }

    // Optionally, ensure the recipient belongs to the sponsor
    if (recipient.sponsor._id.toString() !== sponsorUser._id.toString()) {
      return NextResponse.json(
        { message: "Recipient not associated with sponsor" },
        { status: 403 }
      );
    }

    return NextResponse.json({ recipient }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipient data:", error);
    return NextResponse.json(
      { message: "Error fetching recipient data", error: error.message },
      { status: 500 }
    );
  }
}
