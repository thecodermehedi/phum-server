import TConfig from './config.types';
import configValidation from './config.validator';

const rawConfig = {
  ...(process.env.APP_PORT?.trim() ? { port: Number(process.env.APP_PORT) } : {}),
  ...(process.env.APP_ENV?.trim() ? { nodeEnv: process.env.APP_ENV } : {}),
  ...(process.env.DEF_PWD?.trim()
    ? { defaultPassword: process.env.DEF_PWD }
    : {}),
  ...(process.env.DB_URI?.trim() ? { dbUri: process.env.DB_URI } : {}),
  ...(process.env.DB_HOST?.trim() ? { dbHost: process.env.DB_HOST } : {}),
  ...(process.env.DB_NAME?.trim() ? { dbName: process.env.DB_NAME } : {}),
  ...(process.env.DB_USER?.trim() ? { dbUser: process.env.DB_USER } : {}),
  ...(process.env.DB_PASS?.trim() ? { dbPass: process.env.DB_PASS } : {}),
  ...(process.env.BCRYPT_SALT_ROUNDS?.trim()
    ? { bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) }
    : {}),
};

const config: TConfig = configValidation.parse(rawConfig);

// console.table(config);

export default config;
