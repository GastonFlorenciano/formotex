import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipments
} from "../controllers/admin.controller";

const router = Router();

// ----- Usuarios -----
router.get("/users", protect(["admin"]), getUsers);
router.post("/users", protect(["admin"]), createUser);
router.put("/users/:id", protect(["admin"]), updateUser);
router.delete("/users/:id", protect(["admin"]), deleteUser);

// ----- Equipos -----
router.get("/equipments", protect(["admin"]), getEquipments);
router.post("/equipments", protect(["admin"]), createEquipment);
router.put("/equipments/:id", protect(["admin"]), updateEquipment);
router.delete("/equipments/:id", protect(["admin"]), deleteEquipment);

export default router;
