import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./User"; 

// Tipos de atributos
interface EquipmentAttributes {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  status: "activo" | "en reparacion" | "dado de baja";
  location: string;
  assignedTo?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Opcionales para creación
interface EquipmentCreationAttributes extends Optional<EquipmentAttributes, "id" | "assignedTo"> {}

// Clase del modelo
class Equipment extends Model<EquipmentAttributes, EquipmentCreationAttributes> implements EquipmentAttributes {
  public id!: number;
  public name!: string;
  public type!: string;
  public serialNumber!: string;
  public status!: "activo" | "en reparacion" | "dado de baja";
  public location!: string;
  public assignedTo?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Definición de tabla y columnas
Equipment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("activo", "en reparacion", "dado de baja"),
      defaultValue: "activo",
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "equipments",
    timestamps: true,
  }
);

// Relación con User
Equipment.belongsTo(User, { foreignKey: "assignedTo", as: "user" });

export default Equipment;
