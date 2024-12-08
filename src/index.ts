/* eslint-disable no-console */
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { Application, Request, Response, express, mongoose } from './utils';
import http, { Server } from 'http';
import router from './routes';
import cookieParser from 'cookie-parser';
import seedSuperAdmin from './seed';

export const app: Application = express();
export const server: Server = http.createServer(app);
const { port, nodeEnv, dbUri, dbHost, dbName } = config;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5500', credentials: true }));
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')} ${currentDate.getHours() >= 12 ? 'PM' : 'AM'}`;
  res.status(200).json({
    message: 'Welcome to the University Management System Server',
    timestamp: `${formattedDate} ${formattedTime}`,
  });
});

app.use('/api/v1', router);
app.use(notFound);
app.use(globalErrorHandler);

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
        nodeEnv !== 'production'
          ? '🟢 Connected to MongoDB Compass (dev)'
          : '🟢 Connected to MongoDB Atlas (prod)',
      );
    }
    seedSuperAdmin();
    server.listen(port, () => {
      console.log(`🗄️ Server is running on ${port} (${nodeEnv} mode)`);
    });
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw new Error('😈 Error connecting to the database');
  }
})();

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection Detected, Shutting Down...');
  console.error('Reason:', reason);
  if (Server) {
    server.close(() => {
      mongoose.disconnect();
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception Detected: Shutting Down...');
  console.error('Error:', error);
  if (Server) {
    server.close(() => {
      mongoose.disconnect();
      process.exit(1);
    });
  }
  process.exit(1);
});
