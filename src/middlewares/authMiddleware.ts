import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface JwtPayload {
  id: number;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

export const protect = (roles?: Array<"admin" | "user">) => {
  return async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
      const user = await User.findByPk(decoded.id);

      if (!user) return res.status(401).json({ message: "Not authorized, user not found" });
      if (roles && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient role" });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token invalid" });
    }
  };
};
