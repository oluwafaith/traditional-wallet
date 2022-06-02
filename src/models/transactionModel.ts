import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
 
      amount: {
        type: Number,
        required: true,
        default: 0
      },
      userWallet: {
        type: String,
        ref: 'User',
      },
      balanceBefore: {
        type: Number,
      },
      balanceAfter: {
        type: Number,
      },
    
    },
    { timestamps: true }
    )
    export  const Transaction = mongoose.model('Wallet', transactionSchema);