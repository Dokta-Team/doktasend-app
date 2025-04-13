import mongoose, { Schema } from "mongoose";

const RecipientSchema = new Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    sponsor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    plan: {
      type: String,
      enum: ["GOLD", "DIAMOND", "PLATINUM"],
      required: true,
    },
    nextVisit: Date,
  },
  {
    timestamps: true,
  }
);

const Recipient =
  mongoose.models.Recipient || mongoose.model("Recipient", RecipientSchema);

export default Recipient;
