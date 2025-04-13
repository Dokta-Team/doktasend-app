// src/app/(models)/ActivityLog.js
import mongoose, { Schema } from "mongoose";

const ActivityLogSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      description: "Date of the activity",
    },
    type: {
      type: String,
      required: true,
      description:
        "Type of activity (e.g., Check-in call, Medication delivery, Nurse Visit)",
    },
    notes: {
      type: String,
      required: true,
      description: "Notes or description of the activity",
    },
    agent: {
      type: String,
      required: true,
      description: "Agent or person who recorded the activity",
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog =
  mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", ActivityLogSchema);

export default ActivityLog;
