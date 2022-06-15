import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface WalletUser {
  name: string;
  email: string;
  password: string;
  roles: any[];
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    // enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //   if (this.isModified('password')){
  //     this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (userPassword: any) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export const User = mongoose.model("User", userSchema);
