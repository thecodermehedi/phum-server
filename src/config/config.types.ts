type TConfig = {
  port: number;
  nodeEnv: 'development' | 'production';
  defaultPassword: string;
  dbUri: string;
  dbHost: string;
  dbName: string;
  dbUser?: string;
  dbPass?: string;
  bcrypt_salt_rounds: number;
  jwtSecret: string;
};

export default TConfig;
