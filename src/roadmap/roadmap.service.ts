import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadmapService {
  getRoadmaps(id: string) {
    return `get: roadmaps ${id}`;
  }

  putRoadmaps(id: string) {
    return `put: roadmaps ${id}`;
  }
}
