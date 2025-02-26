import mongoose, { Schema } from "mongoose";

const RecepientSchema = new Schema(
    {
        name: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        sponsor: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User',
          required: true 
        },
        assignedAgent: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' 
        },
        plan: { 
            type: String, 
            enum: ['GOLD', 'DIAMOND', 'PLATINUM'],
            required: true 
          },
          nextVisit: Date
    },
    {
        timestamps: true,
    }
);

const Recepient =
    mongoose.models.Recepient || mongoose.model("Recipient", RecepientSchema);

export default Recepient;