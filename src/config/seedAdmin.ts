import { User } from "../models/User";
import { hashPassword } from "../utils/auth";

export const seedAdmin = async () => {
  const adminEmail = "admin@formotex.com";

  // Verificar si ya existe
  const existingAdmin = await User.findOne({ where: { email: adminEmail } });
  if (existingAdmin) return console.log("✅ Admin ya existe");

  // Crear admin
  const hashedPassword = await hashPassword("admin123");
  await User.create({
    name: "Administrador Inicial",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin inicial creado");
};
