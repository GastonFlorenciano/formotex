import { User } from "../models/User";
import Equipment from "../models/Equipment";

export const getMyEquipmentsService = async (user: User) => {
  return await Equipment.findAll({ where: { assignedTo: user.id } });
};
