import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.registerUserService(req.body.name, req.body.email, req.body.password, req.body.role);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await AuthService.loginUserService(req.body.email, req.body.password);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
