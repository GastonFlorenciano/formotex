import { User } from "../models/User";
import { comparePassword, generateToken } from "../utils/auth";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}


export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Credenciales inválidas");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Credenciales inválidas");

  return generateToken(user.id, user.role);
};
