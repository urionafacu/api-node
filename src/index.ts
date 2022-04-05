/* eslint-disable no-unused-expressions */
import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import routes from 'routes';
import { connectDB, sequelize } from 'config/postgres';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('src/storage'));

app.get('/ping', async (req: Request, res: Response) => {
  const response: any = await sequelize.query('SELECT NOW()');
  return res.status(200).json({ message: 'pong', time: response[0][0].now });
});

/**
 *  Routes
 */

app.use('/api', routes);

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log('⚡️Server is running on port:', PORT);
});

connectDB();
