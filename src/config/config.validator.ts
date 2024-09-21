import { z } from 'zod';

const configValidation = z.object({
  port: z.number().default(5000),
  nodeEnv: z.enum(['development', 'production']).default('development'),
  dbUri: z.string().default('mongodb://<hostname>:27017/<database>'),
  dbHost: z.string().default('localhost'),
  dbName: z.string(),
  dbUser: z.string().optional(),
  dbPass: z.string().optional(),
  defaultPassword: z.string(),
  bcrypt_salt_rounds: z.number().default(12),
  jwtAccessSecret: z.string(),
  jwtAccessExpiresIn: z.string(),
  jwtRefreshSecret: z.string(),
  jwtRefreshExpiresIn: z.string(),
  clientUrl: z.string().default('http://localhost:5173'),
});

export default configValidation;
