import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "admin" | "user";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
