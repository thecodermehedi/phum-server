import { z } from 'zod';

const configValidation = z.object({
  port: z.number().default(5000),
  nodeEnv: z.enum(['development', 'production']).default('development'),
  defaultPassword: z.string().default('phuniapi@admin'),
  dbUri: z.string().default('mongodb://<hostname>:27017/<database>'),
  dbHost: z.string().default('localhost'),
  dbName: z.string().default('phuniapiDB'),
  dbUser: z.string().optional(),
  dbPass: z.string().optional(),
});

export default configValidation;
