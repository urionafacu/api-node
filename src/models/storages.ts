import { DataTypes } from 'sequelize';
import { sequelize } from 'config/postgres';

const Storages = sequelize.define(
  'storages',
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Storages;
