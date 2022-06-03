import { Product } from "../models/productModel";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import CustomError from "../errors";

const createProduct = catchAsync(async (req: any, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await Product.find({});

  res.status(200).json({ products, count: products.length });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(201).json({ product });
});

export { getAllProducts, createProduct, getSingleProduct };
