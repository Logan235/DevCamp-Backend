import { Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('assessment')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('questions')
  getQuestions(): string {
    return this.testService.getQuestions();
  }

  @Post('submissions')
  postSubmissions(): string {
    return this.testService.postSubmissions();
  }

  @Get('results')
  getResults(): string {
    return this.testService.getResults();
  }
}
