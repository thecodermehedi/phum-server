import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import mongoose from 'mongoose';
import express, {
  Application,
  Request,
  Response,
} from 'express';

export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')} ${currentDate.getHours() >= 12 ? 'PM' : 'AM'}`;
  res.status(200).json({
    message:
      'Welcome to the Programming Hero University Server',
    timestamp: `${formattedDate} ${formattedTime}`,
  });
});

(async () => {
  let dbStringUri: string;
  let portNumber: number = port;
  if (!config.port) {
    portNumber =
      config.nodeEnv === 'production' ? 5000 : 3000;
  }
  try {
    if (config.nodeEnv === 'production') {
      dbStringUri = config.dbUri
        .replace('<username>', config)
        .replace('<password>', dbPassword)
        .replace('<hostname>', dbHostname)
        .replace('<database>', dbName)
        .replace('<boolean>', 'true')
        .replace('<string>', 'majority');
    } else {
      dbStringUri = 'mongodb://localhost:27017';
    }
    if (dbStringUri) {
      await mongoose.connect(dbStringUri);
      console.log(
        nodeEnv === 'development'
          ? '🟢 Connected to MongoDB Compass'
          : '🟢 Connected to MongoDB Atlas',
      );
    }

    app.listen(portNumber, () => {
      console.log(
        `👟 Server is running on ${portNumber} (${nodeEnv} mode)`,
      );
    });
  } catch (error) {
    console.error(
      '😈 Error connecting to the database: ',
      error,
    );
  }
})();
