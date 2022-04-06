import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'config/postgres';

export type ModelAttributes = {
  id?: number;
  url: string;
  filename: string;
};

class Storages extends Model<ModelAttributes> {}

Storages.init(
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
    sequelize,
    timestamps: true,
    tableName: 'storages',
  }
);

export default Storages;
