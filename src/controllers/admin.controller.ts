import { Request, Response } from "express";
import * as AdminService from "../services/admin.service";

// ----- Usuarios -----
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await AdminService.createUserService(name, email, password, role);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await AdminService.updateUserService(Number(req.params.id), req.body);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await AdminService.deleteUserService(Number(req.params.id));
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await AdminService.getUsersService();
    res.json(users);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ----- Equipos -----
export const createEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await AdminService.createEquipmentService(req.body);
    res.status(201).json(equipment);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await AdminService.updateEquipmentService(Number(req.params.id), req.body);
    res.json(equipment);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  try {
    await AdminService.deleteEquipmentService(Number(req.params.id));
    res.json({ message: "Equipo eliminado correctamente" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getEquipments = async (_req: Request, res: Response) => {
  try {
    const equipments = await AdminService.getEquipmentsService();
    res.json(equipments);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
