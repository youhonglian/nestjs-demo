import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DemoFilter } from './core/filters/demo.filter';
import { DemoAuthGuard } from './core/guard/demo-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new DemoFilter());
  // app.useGlobalGuards(new DemoAuthGuard());
  await app.listen(3000);
}
bootstrap();
