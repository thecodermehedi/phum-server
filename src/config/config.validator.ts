import { z } from 'zod';

// Define validation for common application configuration
export const CommonConfigValidation = z.object({
  port: z.number().default(5000),
  nodeEnv: z.enum(['development', 'production']).default('development'),
  defaultPassword: z.string().default('phuniapi@admin'),
});

// Define validation for development database configuration
export const DevDbConfigValidation = CommonConfigValidation.extend({
  dbUri: z.string(),
  dbHost: z.string(),
  dbName: z.string(),
});

// Extend base schema for production database configuration
export const ProdDbConfigValidation = DevDbConfigValidation.extend({
  dbUser: z.string(),
  dbPass: z.string(),
});

// Define environment schema incorporating both development and production configurations
export const EnvValidation = z.object({
  APP_PORT: z.number(),
  APP_ENV: z.enum(['development', 'production']),
  // Development Database
  DB_DEV_URI: z.string(),
  DB_DEV_HOST: z.string(),
  DB_DEV_NAME: z.string(),
  // Production Database
  DB_PROD_URI: z.string(),
  DB_PROD_USER: z.string(),
  DB_PROD_PASS: z.string(),
  DB_PROD_NAME: z.string(),
  DB_PROD_HOST: z.string(),
  // Security
  DEF_PWD: z.string(),
});
