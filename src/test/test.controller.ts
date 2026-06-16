import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('assessment')
export class TestController {
  constructor(private readonly testService: TestService) {}

  // Lấy các câu hỏi mẫu/test case mẫu: GET /assessment/questions?challengeId=64b5f1...
  @Get('questions')
  getQuestions(@Query('challengeId') challengeId: string) {
    return this.testService.getQuestions(challengeId);
  }

  // Nộp bài và chấm điểm: POST /assessment/submissions
  @Post('submissions')
  postSubmissions(
    @Body() body: { challengeId: string; userCodeOutput: string[] },
  ) {
    return this.testService.postSubmissions(body);
  }

  // Xem cấu trúc/kết quả test case của bài tập: GET /assessment/results?challengeId=64b5f1...
  @Get('results')
  getResults(@Query('challengeId') challengeId: string) {
    return this.testService.getResults(challengeId);
  }
}
