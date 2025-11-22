import { Request, Response } from "express";
import { User } from "../models/User";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id, user.role);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
