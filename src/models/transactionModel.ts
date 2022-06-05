import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    // userWallet: {
    //   type: String,
    //   ref: "User",
    // },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    balanceBefore: {
      type: Number,
    },
    balanceAfter: {
      type: Number,
    },
  },
  { timestamps: true }
);
export const Transaction = mongoose.model("Wallet", transactionSchema);
