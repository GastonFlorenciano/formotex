import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const getMyEquipments = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const equipments = await UserService.getMyEquipmentsService(user);
    res.json(equipments);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
