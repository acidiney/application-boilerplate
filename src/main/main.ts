import 'reflect-metadata'
import { config } from 'dotenv'

import chalk from 'chalk'
import { NestFactory } from '@nestjs/core'
import { INestApplication, Logger } from '@nestjs/common'
import expressBasicAuth from 'express-basic-auth'

import { Env } from './config/env'
import { MainModule } from '../framework/main.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

config()

function setupSwagger (app: INestApplication): void {
  const APP_NAME = Env.appName
  const APP_DESCRIPTION = Env.appDescription

  const SWAGGER_ADMIN_USERNAME = Env.swagger.username
  const SWAGGER_ADMIN_PASSWORD = Env.swagger.password

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion('v1')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  if (Env.isProd) {
    app.use(
      '/',
      expressBasicAuth({
        users: {
          [SWAGGER_ADMIN_USERNAME]: SWAGGER_ADMIN_PASSWORD
        },
        challenge: true
      })
    )
  }

  SwaggerModule.setup('/', app, document)
  SwaggerModule.setup('/docs', app, document)

  Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer')
  Logger.log('Mapped {/docs, GET} Swagger api route', 'RouterExplorer')
}

async function bootstrap (): Promise<void> {
  try {
    const app: INestApplication = await NestFactory.create(MainModule, {
      cors: true
    })

    setupSwagger(app)

    await app.listen(Env.port)

    if (Env.isProd) {
      Logger.log(
        `🚀  Server is listening on port ${chalk
          .hex('#87e8de')
          .bold(`${Env.port}`)}`,
        'Bootstrap',
        false
      )
      return
    }
    Logger.log(
      `🚀  Server ready at https://${Env.host}:${chalk
        .hex('#87e8de')
        .bold(`${Env.port}`)}`,
      'Bootstrap',
      false
    )
  } catch (error) {
    Logger.error(error, 'Bootstrap')
  }
}

void bootstrap()
