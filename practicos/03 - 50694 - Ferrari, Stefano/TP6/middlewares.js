import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./constants.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json("You need to log in to access");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("Failed to authenticate token");
    }

    req.user = decoded;
    next();
  });
};