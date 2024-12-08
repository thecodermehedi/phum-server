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
  clientUrl: z.string().default('http://localhost:5173'),
  smtpHost: z.string().optional(),
  smtpPort: z.number().optional(),
  smtpUser: z.string().optional(),
  smtpPass: z.string().optional(),
  cloudinaryCloudName: z.string().optional(),
  cloudinaryApiKey: z.string().optional(),
  cloudinaryApiSecret: z.string().optional(),
  jwtAccessSecret: z.string(),
  jwtAccessExpiresIn: z.string(),
  jwtRefreshSecret: z.string(),
  jwtRefreshExpiresIn: z.string(),
  bcrypt_salt_rounds: z.number().default(12),
  super_admin_password: z.string().default('Pa$$w0rd!'),
});

export default configValidation;
