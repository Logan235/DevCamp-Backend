import { Controller, Get, Post, Body } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('assessment')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('questions')
  getQuestions() {
    return this.testService.getQuestions();
  }

  @Post('submissions')
  postSubmissions(@Body() body: any) {
    return this.testService.postSubmissions(body);
  }

  @Get('results')
  getResults() {
    return this.testService.getResults();
  }
}
