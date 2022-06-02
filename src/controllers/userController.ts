import {User} from '../models/userModel';
import {Request, Response, NextFunction } from 'express'
import CustomError from "../errors"
import {
  createUserToken,
  attachCookiesToResponse,
  checkPermissions,
} from '../utils';

const getAllUsers = async (req:Request, res:Response) => {
  
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(200).json({ users });
};

const getSingleUser = async (req:Request, res:Response) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
//   checkPermissions(req.user, user._id);
  res.status(200).json({ user });
};

const showCurrentUser = async (req:Request, res:Response) => {
//   res.status(200).json({ user: req.user });
};

// update user with user.save()
const updateUser = async (req:Request, res:Response) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
//   const user = await User.findOne({ _id: req.user.userId });

//   user.email = email;
//   user.name = name;

//   await user.save();

//   const tokenUser = createUserToken(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(200).json({ user: tokenUser });
};
const updateUserPassword = async (req:Request, res:Response) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
//   const user = await User.findOne({ _id: req.user.userId });

//   const isPasswordCorrect = await user.comparePassword(oldPassword);
//   if (!isPasswordCorrect) {
//     throw new CustomError.UnauthenticatedError('Invalid Credentials');
//   }
//   user.password = newPassword;

//   await user.save();
  res.status(200).json({ msg: 'Success! Password Updated.' });
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
