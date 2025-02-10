import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json(new ApiError({ message: "Unauthorized: Token missing" }));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user payload to the request
    // console.log(decode);
    next(); // Proceed to the next middleware or route
  } catch (err) {
    return res.status(403).json(new ApiError("Forbidden: Invalid token",403,err.message));
  }
};
