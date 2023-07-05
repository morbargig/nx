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
  const globalPrefix = '/api';
  const swaggerPath = `${globalPrefix}/swagger`;
  app.setGlobalPrefix(globalPrefix);
  setupOpenApi(app, swaggerPath);

  app.enableCors();
  app.use((req, res, next) => {
    res.header('X-powered-by', 'Phoenix Power');
    res.header('Server', 'Agents Server');
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
    .setTitle('Agents BFF (Backend for Frontend)')
    .setDescription(
      'Represents the middleware api services for the agents project'
    )
    .setVersion('1.0')
    // // .addTag('Java Api', 'Java is a Rest Api for personal info project', {
    // //   'description': "Java Swagger",
    // //   url: `${serverConfig['java-api'].baseURL}:${serverConfig['java-api'].port || 80}/javaapi/swagger-ui.html`
    // // })
    // // .setExternalDoc('Dexter API', `${serverConfig['dexter-api'].baseURL}:${serverConfig['dexter-api'].port || 80}/dexterapi/swagger/`)
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
    customSiteTitle: 'Agents BFF Api',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      // oauth2RedirectUrl: 'http://localhost:4200/', // should come from server
      // oauth: {
      //   clientId: 'rerkOPlxNvRFsbOvAZUvuqEpEUgmOeYZ', // should come from server
      // }
    },
  };
  SwaggerModule.setup(swaggerPath, app, document, swaggerCustomOptions);
}
