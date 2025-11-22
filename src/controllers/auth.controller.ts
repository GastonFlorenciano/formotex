import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await AuthService.loginService(req.body.email, req.body.password);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
