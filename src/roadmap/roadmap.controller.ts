import { Controller, Get, Put, Body, Request, UseGuards } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';

@Controller('roadmaps')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get('me')
  getRoadmaps(@Request() req: any) {
    const userId = req.user?.id || '123456789abcdefghijkl';
    return this.roadmapService.getRoadmaps(userId);
  }

  @Put('me')
  putRoadmaps(@Request() req: any, @Body() body: any) {
    const userId = req.user?.id || '123456789abcdefghijkl';
    return this.roadmapService.putRoadmaps(userId, body);
  }
}
