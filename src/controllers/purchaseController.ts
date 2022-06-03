import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import CustomError from "../errors";
import { Product } from "../models/productModel";
import { Order } from "../models/purchaseModel";
import { Transaction } from "../models/transactionModel";

export const orderProduct = catchAsync(async (req: any, res: Response) => {
  const { items: cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }

  let orderItems: any[] = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }
    const { name, price, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal

    subtotal += item.amount * price;
  }

  const total = subtotal;

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    user: req.user.userId,
  });

  res.status(201).json({
    order,
  });
});

export const purchaseProduct = catchAsync(async (req: any, res: Response) => {
  const { email, amount, orderId, userId } = req.body;

  const user = await User.findOne({ email });

  const order = await Order.findOne({ id: userId });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
 
  if (!order) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (user.wallet < amount) {
    throw new CustomError.BadRequestError("Insufficient balance");
  }

  const updatedWallet = await User.findOneAndUpdate(
    { email },
    { $inc: { wallet: amount } }
  );

  const transaction = await Transaction.create([
    {
      amount,
      name: user.name,
      email: user.email,
      balanceBefore: user.wallet,
      balanceAfter: user.wallet - Number(amount),
    },
  ]);
  res.status(201).json({
    message: "purchase successful",
    data: updatedWallet,
    transaction,
  });
});
