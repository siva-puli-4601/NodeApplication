import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.username,password:user.password }, process.env.JWT_SECRET, { expiresIn: "2m" });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.username,password:user.password }, process.env.JWT_REFRESH_SECRET, { expiresIn: "3m" });
};
