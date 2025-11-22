import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { seedAdmin } from "./config/seedAdmin";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";

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

// Rutas
app.use("/api/auth", authRoutes);     // Login para cualquier rol
app.use("/api/admin", adminRoutes);   // Acceso total (Admin)
app.use("/api/user", userRoutes);     // Ver sus equipos (User)

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Crear admin inicial si no existe
    await seedAdmin();

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
