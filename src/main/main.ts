import 'module-alias/register'
import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import { INestApplication, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import chalk from 'chalk'

import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import expressBasicAuth from 'express-basic-auth'

import { Env } from '@infra/config/env'
import * as os from 'os'
import cluster from 'cluster'
import { MysqlHelper } from '@infra/db/mysql/init'

function setupSwagger (app: INestApplication, env: typeof Env): void {
  const APP_NAME = env.appName
  const APP_DESCRIPTION = env.appDescription

  const SWAGGER_ADMIN_USERNAME = env.swagger.username
  const SWAGGER_ADMIN_PASSWORD = env.swagger.password

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(env.appVersion)
    .build()

  const document = SwaggerModule.createDocument(app, options)

  if (env.isProd) {
    app.use(
      '/docs',
      expressBasicAuth({
        users: {
          [SWAGGER_ADMIN_USERNAME]: SWAGGER_ADMIN_PASSWORD
        },
        challenge: true
      })
    )
  }

  SwaggerModule.setup('/docs', app, document)

  Logger.log('Mapped {/docs, GET} Swagger api route', 'RouterExplorer')
}

function setupSentry (app: INestApplication, env: typeof Env): void {
  Sentry.init({
    dsn: env.sentryDNS,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Mongo({
        useMongoose: true
      })
    ]
  })
}

async function setupApplication (env: typeof Env): Promise<void> {
  const { MainModule } = await import('./framework/main.module')

  try {
    await MysqlHelper.setup({ info: Logger.log })

    const app: INestApplication = await NestFactory.create(MainModule, {
      cors: true
    })

    setupSwagger(app, env)
    setupSentry(app, env)

    await app.listen(env.port)

    Logger.log(
      `🚀  Server ready at ${env.httpProtocol}://${Env.host}:${chalk
        .hex('#87e8de')
        .bold(`${env.port}`)}`,
      'Bootstrap',
      false
    )
  } catch (error) {
    Logger.error(error, 'Bootstrap')
  }
}

async function bootstrap (): Promise<void> {
  const { Env } = await import('../infra/config/env')

  const totalCPUs = Env.isDev ? 1 : os.cpus().length

  if (cluster.isMaster || cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`)
    console.log(`Master ${process.pid} is running`)

    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
      console.log("Let's fork another worker!")
      cluster.fork()
    })
  } else {
    await setupApplication(Env)
  }
}

void bootstrap()
