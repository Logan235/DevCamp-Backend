import { Controller, Get, Param, Put } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';

@Controller('roadmaps')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get('/:id')
  getRoadmaps(@Param('id') id: string) {
    return this.roadmapService.getRoadmaps(id);
  }

  @Put('/:id')
  putRoadmaps(@Param('id') id: string) {
    return this.roadmapService.putRoadmaps(id);
  }
}
