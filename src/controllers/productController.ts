// import Product from '../models/productModel';
import {Request, Response, NextFunction } from 'express'
import { catchAsync } from "../utils/catchAsync"
import CustomError from "../errors"
import path from 'path';

// const createProduct = async (req:Request, res:Response) => {
//     // req.body.user = req.user;
//     const product = await Product.create(req.body);
//     res.status(201).json({ product });
//   };
const getAllProducts = async (req:Request, res:Response) => {
    res.send("lo")
  };
const getSingleProduct = async (req:Request, res:Response) => {
    res.send("lo")
  };
const createProduct = async (req:Request, res:Response) => {
    res.send("lo")
  };
const updateProduct = async (req:Request, res:Response) => {
    res.send("lo")
  };
const deleteProduct = async (req:Request, res:Response) => {
    res.send("lo")
  };
const uploadImage = async (req:Request, res:Response) => {
    res.send("lo")
  };

  export{
      getAllProducts, 
      createProduct,
      getSingleProduct,
      updateProduct,
      deleteProduct,
      uploadImage
  }