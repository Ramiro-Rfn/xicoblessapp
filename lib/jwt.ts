import jwt from "jsonwebtoken";

const SECRET_KEY = "Xicobleslkadhkahakjal";

export const generateToken = (user: { id: number; email: string }) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
