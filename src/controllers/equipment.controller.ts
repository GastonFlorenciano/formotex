import { Request, Response } from "express";
import * as EquipmentService from "../services/equipment.service";
import { User } from "../models/User";

type AuthRequest = Request & { user?: User };

export const createEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const equipment = await EquipmentService.createEquipmentService(req.body, user);
    res.status(201).json(equipment);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getEquipments = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const equipments = await EquipmentService.getEquipmentsService(user);
    res.json(equipments);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getEquipmentById = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const equipment = await EquipmentService.getEquipmentByIdService(Number(req.params.id), user);
    res.json(equipment);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const equipment = await EquipmentService.updateEquipmentService(Number(req.params.id), req.body, user);
    res.json(equipment);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    await EquipmentService.deleteEquipmentService(Number(req.params.id), user);
    res.json({ message: "Equipment deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
