// src/app/(models)/Medication.js
import mongoose, { Schema } from "mongoose";

const MedicationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      description: "Name of the medication",
    },
    dosage: {
      type: String,
      required: true,
      description: "Dosage of the medication (e.g., 10mg, 500mg)",
    },
    frequency: {
      type: String,
      required: true,
      description:
        "Frequency of medication intake (e.g., Once daily, Twice daily)",
    },
    startDate: {
      type: Date,
      required: true,
      description: "Start date of medication",
    },
    endDate: {
      type: Date,
      description: "End date of medication",
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      required: true,
    },
    notes: {
      type: String,
      description: "Additional notes for the medication",
    },
  },
  {
    timestamps: true,
  }
);

const Medication =
  mongoose.models.Medication || mongoose.model("Medication", MedicationSchema);

export default Medication;
