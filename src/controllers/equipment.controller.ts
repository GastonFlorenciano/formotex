import { Request, Response } from "express";
import Equipment from "../models/Equipment";

export const createEquipment = async (req: Request, res: Response) => {
  try {
    const { name, type, serialNumber, status, location, assignedTo } = req.body;
    const equipment = await Equipment.create({ name, type, serialNumber, status, location, assignedTo });
    res.status(201).json(equipment);
  } catch (err) {
    res.status(500).json({ message: "Error creando el equipo", error: err });
  }
};

export const getEquipments = async (_req: Request, res: Response) => {
  try {
    const equipments = await Equipment.findAll();
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo equipos", error: err });
  }
};

export const getEquipmentById = async (req: Request, res: Response) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ message: "Equipo no encontrado" });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo el equipo", error: err });
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ message: "Equipo no encontrado" });

    await equipment.update(req.body);
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: "Error actualizando el equipo", error: err });
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ message: "Equipo no encontrado" });

    await equipment.destroy();
    res.json({ message: "Equipo eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error eliminando el equipo", error: err });
  }
};
