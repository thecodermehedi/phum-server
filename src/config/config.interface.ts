// desc: Interface for the config files

export interface ICommonConfig {
  port: number;
  nodeEnv: 'development' | 'production';
  defaultPassword: string;
}

export interface IDevConfig extends ICommonConfig {
  dbUri: string;
  dbHost: string;
  dbName: string;
}

export interface IProdConfig extends IDevConfig {
  dbUser: string;
  dbPass: string;
}
