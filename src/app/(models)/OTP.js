import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const OTPSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      //   index: { expires: "25m" }, // OTP will automatically expire after 5 minutes
    },
  },
  {
    timestamps: true,
  }
);

const otp = mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
export default otp;
