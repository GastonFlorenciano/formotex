import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipment.controller";

const router = Router();

// Solo admin puede crear, actualizar o borrar equipos
router.post("/", protect(["admin"]), createEquipment);
router.put("/:id", protect(["admin"]), updateEquipment);
router.delete("/:id", protect(["admin"]), deleteEquipment);

// Usuarios logueados pueden ver equipos
router.get("/", protect(), getEquipments);
router.get("/:id", protect(), getEquipmentById);

export default router;
