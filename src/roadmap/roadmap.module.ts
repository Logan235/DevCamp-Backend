import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';

@Module({
  providers: [RoadmapService],
  controllers: [RoadmapController],
})
export class RoadmapModule {}
