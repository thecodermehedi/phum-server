import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import mongoose from 'mongoose';
import express, { Application, Request, Response } from 'express';

export const app: Application = express();

const { port, nodeEnv, dbUri, dbHost, dbName } = config;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')} ${currentDate.getHours() >= 12 ? 'PM' : 'AM'}`;
  res.status(200).json({
    message: 'Welcome to the Programming Hero University Server',
    timestamp: `${formattedDate} ${formattedTime}`,
  });
});

(async () => {
  let dbStringUri: string = dbUri
    .replace('<hostname>', dbHost)
    .replace('<database>', dbName);

  if (nodeEnv === 'production') {
    dbStringUri = dbUri
      .replace('<username>', config.dbUser || 'notFound')
      .replace('<password>', config.dbPass || 'notFound')
      .replace('<boolean>', 'true')
      .replace('<string>', 'majority');
  }

  try {
    if (dbStringUri) {
      console.log('🟡 Connecting...');
      await mongoose.connect(dbStringUri);
      console.log(
        nodeEnv === 'development'
          ? '🟢 Connected to MongoDB Compass'
          : '🟢 Connected to MongoDB Atlas',
      );
    }

    app.listen(port, () => {
      console.log(`👟 Server is running on ${port} (${nodeEnv} mode)`);
    });
  } catch (error) {
    console.error('😈 Error connecting to the database: ', error);
  }
})();
