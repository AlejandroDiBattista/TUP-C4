import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, SECRET_KEY } from "./constants.js";

export const hasDuplicatedEmail = (email) => {
  return users?.some((user) => user.email === email);
};

export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (rawPassword, hashPassword) => {
  const isEqual = await bcryptjs.compare(rawPassword, hashPassword);
  return isEqual;
};

export const getUser = (email) => {
  return users?.find((user) => user.email === email);
};

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};