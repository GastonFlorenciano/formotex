import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import equipmentRoutes from "./routes/equipment.routes";
import { sequelize } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API FORMOTEX funcionando con MySQL!");
});

app.use("/api/auth", authRoutes);
app.use("/api/equipments", equipmentRoutes);
  
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); 
    console.log("✅ Conectado a MySQL");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
