export type EnvironmentType = {
  production: boolean;
  env: 'prod' | 'dev';
  port?:number
  https?: boolean;
};
