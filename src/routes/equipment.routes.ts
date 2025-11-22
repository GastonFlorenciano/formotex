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

// Rutas protegidas con middleware
router.post("/", protect(["admin"]), createEquipment);      // Crear equipo → solo admin
router.get("/", protect(), getEquipments);                  // Listar equipos → cualquier usuario logueado
router.get("/:id", protect(), getEquipmentById);            // Ver un equipo → cualquier usuario logueado
router.put("/:id", protect(["admin"]), updateEquipment);    // Actualizar → solo admin
router.delete("/:id", protect(["admin"]), deleteEquipment);// Borrar → solo admin

export default router;
