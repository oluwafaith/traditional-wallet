import {Request, Response, NextFunction } from 'express'
import {User} from "../models/userModel"
import {Transaction} from "../models/transactionModel"
import CustomError from "../errors"
import { catchAsync } from "../utils/catchAsync"


export const creditAccount = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {email, amount} = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
      }

  const updatedWallet = await User.findOneAndUpdate({email}, { $inc: { wallet: amount } });
  
  const transaction = await Transaction.create([{
    amount,
    name: user.name,
    email: user.email,
    balanceBefore: user.wallet,
    balanceAfter: user.wallet + Number(amount),
  }]);
  res.status(201).json({ 
    message: 'Credit successful',
      data:  updatedWallet, transaction });
})

export const debitAccount = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {email, amount} = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
      }
     
      if(user.wallet < amount){
        throw new CustomError.BadRequestError('Insufficient balance');
      }

  const updatedWallet = await User.findOneAndUpdate({email}, { $inc: { wallet: amount } });
  
  const transaction = await Transaction.create([{
    amount,
    name: user.name,
    email: user.email,
    balanceBefore: user.wallet,
    balanceAfter: user.wallet - Number(amount),
  }]);
  res.status(201).json({ 
    message: 'Withdrawal successful',
      data:  updatedWallet, transaction });
})

export const walletBalance = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {email} = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
      }
     const balance = await user.wallet
     
  res.status(201).json({ 
    message: 'Account balance request successful',
      data:  balance });
})