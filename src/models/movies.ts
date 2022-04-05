import { DataTypes } from 'sequelize';
import { sequelize } from 'config/postgres';

const Movies = sequelize.define(
  'movies',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Movies;
