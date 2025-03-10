import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule
    // run on https with some certificate
    // ...(environment.https ? [{
    //   httpsOptions: {
    //     key: readFileSync(path.join(__dirname, "../dev-tools/ssl/key.pem")),
    //     cert: readFileSync(path.join(__dirname, "../dev-tools/ssl/certificate.pem")),
    //   }
    // }] : [])
  );
  const globalPrefix = 'api';
  const swaggerPath = `${globalPrefix}/swagger`;
  app.setGlobalPrefix(globalPrefix);
  setupOpenApi(app, swaggerPath);

  app.enableCors();
  app.use((req, res, next) => {
    res.header('X-powered-by', 'Softbar Power');
    res.header('Server', 'Demo-Api Server');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  const port = process.env.PORT || environment.port || 8080;
  function onListen() {
    console.log(`Environment: ${environment.env}`);
    console.log(`Running Port: ${port}`);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}
          Swagger is running on: http://localhost:${port}/${swaggerPath}/`
    );
  }
  if (environment.https) {
    await app.listen(port, '0.0.0.0', onListen);
  } else {
    await app.listen(port, onListen);
  }
}

bootstrap();

function setupOpenApi(app: INestApplication, swaggerPath: string) {
  const docBuilderConfig = new DocumentBuilder()
    .setTitle('Api')
    .setDescription(
      'Represents the middleware api services for the agents project'
    )
    .setVersion('1.0')
    // // .addTag('Api', 'Rest Api', {
    // //   'description': "Api Swagger",
    // //   url: `${serverConfig['api'].baseURL}:${serverConfig['api'].port || 80}/api/swagger-ui.html`
    // // })
    // // .setExternalDoc('API', `${serverConfig['api'].baseURL}:${serverConfig['api'].port || 80}/api/swagger/`)
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //     name: 'JWT',
    //     description: 'Enter JWT token',
    //     in: 'header',
    //   },
    //   bearerAuthType.userAccessToken
    // )
    .build();
  const document = SwaggerModule.createDocument(app, docBuilderConfig);
  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Api',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup(swaggerPath, app, document, swaggerCustomOptions);
}
