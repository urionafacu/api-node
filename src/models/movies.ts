import { DataTypes } from 'sequelize';
import { sequelize } from 'config/postgres';
import UsersModel from 'models/users';

const Movies = sequelize.define(
  'movies',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

UsersModel.hasMany(Movies, { as: 'movies' });

export default Movies;
