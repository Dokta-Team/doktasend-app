import { NextResponse } from "next/server";
import Recipient from "@/app/(models)/Recipients";
import User from "@/app/(models)/User";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params; // Await the params promise
    const { username, recipientId } = resolvedParams; // Now you can safely destructure

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
    console.log(recipient);

    // if (recipient.sponsor._id.toString() !== sponsorUser._id.toString()) {
    //   return NextResponse.json(
    //     { message: "Recipient not associated with sponsor" },
    //     { status: 403 }
    //   );
    // }

    return NextResponse.json({ recipient }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipient data:", error);
    return NextResponse.json(
      { message: "Error fetching recipient data", error: error.message },
      { status: 500 }
    );
  }
}
