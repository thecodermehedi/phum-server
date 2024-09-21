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
  jwtAccessSecret: string;
  jwtAccessExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  clientUrl: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
};

export default TConfig;
