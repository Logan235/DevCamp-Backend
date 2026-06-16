import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('assessment')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('questions') // GET /assessment/questions?challengeId=...
  getQuestions(@Query('challengeId') challengeId: string) {
    return this.testService.getQuestions(challengeId);
  }

  @Post('submissions') // POST /assessment/submissions
  postSubmissions(
    @Body() body: { challengeId: string; userCodeOutput: string[] },
  ) {
    return this.testService.postSubmissions(body);
  }

  @Get('results') // GET /assessment/results?challengeId=...
  getResults(@Query('challengeId') challengeId: string) {
    return this.testService.getResults(challengeId);
  }
}
