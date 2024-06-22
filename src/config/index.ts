import {
  IDevConfig,
  IProdConfig,
} from './config.interface';
import {
  CommonConfigValidation,
  DevDbConfigValidation,
  EnvValidation,
  ProdDbConfigValidation,
} from './config.validator';

const parsedEnv = EnvValidation.parse(process.env);

let config: IDevConfig | IProdConfig;

const commonConfig = CommonConfigValidation.parse({
  nodeEnv: parsedEnv.APP_ENV,
  port: parsedEnv.APP_PORT,
  defaultPassword: parsedEnv.DEF_PWD,
});

if (parsedEnv.APP_ENV === 'production') {
  const prodConfig = ProdDbConfigValidation.parse({
    dbUri: parsedEnv.DB_PROD_URI,
    dbUser: parsedEnv.DB_PROD_USER,
    dbPass: parsedEnv.DB_PROD_PASS,
    dbName: parsedEnv.DB_PROD_NAME,
    dbHost: parsedEnv.DB_PROD_HOST,
  });
  config = { ...commonConfig, ...prodConfig };
} else {
  const devConfig = DevDbConfigValidation.parse({
    dbUri: parsedEnv.DB_DEV_URI,
    dbHost: parsedEnv.DB_DEV_HOST,
    dbName: parsedEnv.DB_DEV_NAME,
  });
  config = { ...commonConfig, ...devConfig };
}

export default config;
