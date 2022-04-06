import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'config/postgres';
import UsersModel from 'models/users';

export type ModelAttributes = {
  id: string;
  userId?: string;
};

class Movies extends Model<ModelAttributes> {}

Movies.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'movies',
    timestamps: true,
  }
);

UsersModel.hasMany(Movies, { as: 'movies', foreignKey: 'userId' });

export default Movies;
