import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  balance: {
    type: String,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Wallet = mongoose.model("Wallet", walletSchema);
