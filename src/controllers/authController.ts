import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import CustomError from "../errors";
import { attachCookiesToResponse, createUserToken } from "../utils/index";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists");
    }

    const user = await User.create({ name, email, password });
    const tokenUser = createUserToken(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(201).json({ user: tokenUser });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    const tokenUser = createUserToken(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(200).json({ user: tokenUser });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(200).json({ msg: "user logged out!" });
  }
);

export { signup, login, logout };
