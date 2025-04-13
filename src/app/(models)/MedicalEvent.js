// src/app/(models)/MedicalEvent.js
import mongoose, { Schema } from "mongoose";

const MedicalEventSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      description: "Type of visit (e.g., Nurse Visit, Doctor Consultation)",
    },
    date: {
      type: Date,
      required: true,
      description: "Date of the visit",
    },
    time: {
      type: String,
      required: true,
      description: "Time of the visit (e.g., 10:00 AM)",
    },
    status: {
      type: String,
      required: true,
      description:
        "Status of the visit (e.g., Scheduled, Pending Confirmation, Completed)",
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      required: true,
    },
    notes: {
      type: String,
      description: "Additional notes for the medical event",
    },
  },
  {
    timestamps: true,
  }
);

const MedicalEvent =
  mongoose.models.MedicalEvent ||
  mongoose.model("MedicalEvent", MedicalEventSchema);

export default MedicalEvent;
