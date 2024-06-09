import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import headers from "fastify-helmet";
import fastifyRateLimiter from "fastify-rate-limit";
import { AppModule } from "./modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableCors();
  app.register(headers);
  app.register(fastifyRateLimiter, {
    max: 100,
    timeWindow: 60000,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000, "0.0.0.0");
})();
