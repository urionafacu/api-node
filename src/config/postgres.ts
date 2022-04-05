/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Sequelize } from 'sequelize';
import fs from 'fs';

const database = process.env.PG_DATABASE || 'postgres';
const user = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || 'postgres';
const host = process.env.PG_HOST || 'localhost';
const port = Number(process.env.PG_PORT || 5432);

const sequelize = new Sequelize(database, user, password, {
  dialect: 'postgres',
  host,
  port,
  logging: false,
});

const modelsDefiners: any[] = [];

fs.readdirSync(`${__dirname}/../models`).forEach(file => {
  if (!file.startsWith('index')) {
    modelsDefiners.push(require(`${__dirname}/../models/${file}`).default);
  }
});

modelsDefiners.filter(Boolean).forEach(Model => new Model(sequelize));

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Error connecting to Postgres database:', error);
  }
};

export { sequelize, connectDB };
