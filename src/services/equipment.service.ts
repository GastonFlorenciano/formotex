import Equipment from "../models/Equipment";
import { User } from "../models/User";

export const createEquipmentService = async (data: any, currentUser: User) => {
  // Validar si assignedTo existe
  if (data.assignedTo) {
    const user = await User.findByPk(data.assignedTo);
    if (!user) throw new Error(`El usuario con id ${data.assignedTo} no existe`);
  }

  try {
    const equipment = await Equipment.create(data);
    return equipment;
  } catch (err: any) {
    // Detectar violaciones de FK o unicidad y lanzar mensaje específico
    if (err.name === "SequelizeForeignKeyConstraintError") {
      throw new Error("No se puede asignar a ese usuario: usuario no encontrado");
    } else if (err.name === "SequelizeUniqueConstraintError") {
      throw new Error("Ya existe un equipo con ese serialNumber");
    }
    throw new Error("Error al crear el equipo"); // otros errores
  }
};

export const getEquipmentsService = async (_currentUser: User) => {
  const equipments = await Equipment.findAll({ include: [{ model: User, as: "user" }] });
  return equipments;
};

export const getEquipmentByIdService = async (id: number, _currentUser: User) => {
  const equipment = await Equipment.findByPk(id, { include: [{ model: User, as: "user" }] });
  if (!equipment) throw new Error("Equipo no encontrado");
  return equipment;
};

export const updateEquipmentService = async (id: number, data: any, currentUser: User) => {
  const equipment = await Equipment.findByPk(id);
  if (!equipment) throw new Error("Equipo no encontrado");

  if (data.assignedTo && currentUser.role !== "admin") {
    throw new Error("Solo el administrador puede asignar un equipo a un usuario");
  }

  if (data.assignedTo) {
    const user = await User.findByPk(data.assignedTo);
    if (!user) throw new Error("El usuario asignado no existe");
  }

  try {
    await equipment.update(data);
    return equipment;
  } catch (err: any) {
    if (err.name === "SequelizeUniqueConstraintError") {
      throw new Error("Ya existe un equipo con ese serialNumber");
    }
    throw new Error("Error al actualizar el equipo");
  }
};

export const deleteEquipmentService = async (id: number, currentUser: User) => {
  if (currentUser.role !== "admin") {
    throw new Error("Solo el administrador puede eliminar equipos");
  }

  const equipment = await Equipment.findByPk(id);
  if (!equipment) throw new Error("Equipo no encontrado");

  try {
    await equipment.destroy();
  } catch (err) {
    throw new Error("Error al eliminar el equipo");
  }
};
