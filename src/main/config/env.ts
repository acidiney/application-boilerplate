
const nodeEnv = String(process.env.NODE_ENV).toLocaleLowerCase()

export const Env = {
  nodeEnv,
  httpProtocol: process.env.PROTOCOL || 'http' as string,
  isDev: nodeEnv === 'development',
  isProd: nodeEnv === 'production',
  isTest: nodeEnv === 'testing' || nodeEnv === 'test',
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',
  secretKey: process.env.APP_KEY,
  appName: process.env.APP_NAME,
  appDescription: process.env.APP_DESCRIPTION,
  database: {
    client: process.env.DATABASE_CLIENT,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    auth: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    }
  },
  swagger: {
    username: process.env.SWAGGER_ADMIN_USERNAME,
    password: process.env.SWAGGER_ADMIN_PASSWORD
  }
}
