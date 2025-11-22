import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getMyEquipments } from "../controllers/user.controller";

const router = Router();

router.get("/equipments", protect(["user"]), getMyEquipments);

export default router;
