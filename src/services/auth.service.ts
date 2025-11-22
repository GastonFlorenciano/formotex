import { User } from "../models/User";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

export const registerUserService = async (name: string, email: string, password: string, role: "admin" | "user") => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email already exists");

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed, role });

  return { id: user.id, name: user.name, email: user.email, role: user.role };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = generateToken(user.id, user.role);
  return token;
};
