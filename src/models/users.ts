import { DataTypes } from 'sequelize';
import { sequelize } from 'config/postgres';
import { UserRolEnum } from 'types/user';

const Users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 99,
        notEmpty: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 99,
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 8,
        max: 120,
      },
    },
    role: {
      type: DataTypes.ENUM(UserRolEnum.ADMIN, UserRolEnum.USER),
      defaultValue: UserRolEnum.USER,
    },
  },
  {
    timestamps: true,
  }
);

export default Users;
