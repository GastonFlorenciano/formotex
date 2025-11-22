import { User } from "../models/User";
import Equipment from "../models/Equipment";
import { hashPassword } from "../utils/auth";

// ----- Usuarios -----
export const createUserService = async (name: string, email: string, password: string, role: "admin" | "user") => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("El email ya existe");

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed, role });
  return { id: user.id, name: user.name, email: user.email, role: user.role };
};

export const updateUserService = async (id: number, data: any) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");

  if (data.password) data.password = await hashPassword(data.password);
  if (data.email && data.email !== user.email) {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) throw new Error("El email ya está en uso");
  }

  await user.update(data);
  return { id: user.id, name: user.name, email: user.email, role: user.role };
};

export const deleteUserService = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");

  await user.destroy();
};

export const getUsersService = async () => {
  const users = await User.findAll({ attributes: ["id", "name", "email", "role"] });
  return users;
};

// ----- Equipos -----
export const createEquipmentService = async (data: any) => {
  if (data.assignedTo) {
    const user = await User.findByPk(data.assignedTo);
    if (!user) throw new Error("No se puede asignar a ese usuario: usuario no encontrado");
  }
  const equipment = await Equipment.create(data);
  return equipment;
};

export const updateEquipmentService = async (id: number, data: any) => {
  const equipment = await Equipment.findByPk(id);
  if (!equipment) throw new Error("Equipo no encontrado");

  if (data.assignedTo) {
    const user = await User.findByPk(data.assignedTo);
    if (!user) throw new Error("No se puede asignar a ese usuario: usuario no encontrado");
  }

  await equipment.update(data);
  return equipment;
};

export const deleteEquipmentService = async (id: number) => {
  const equipment = await Equipment.findByPk(id);
  if (!equipment) throw new Error("Equipo no encontrado");

  await equipment.destroy();
};

export const getEquipmentsService = async () => {
  const equipments = await Equipment.findAll({ include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }] });
  return equipments;
};
