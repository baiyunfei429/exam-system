import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });
  // 2. 启动所有已注册的微服务
  await app.startAllMicroservices();
  await app.listen(3002);
}
void bootstrap();
