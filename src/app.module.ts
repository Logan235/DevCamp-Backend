import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
  imports: [TestModule, RoadmapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
