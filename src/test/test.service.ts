import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getQuestions(): string {
    return 'get: questions';
  }

  postSubmissions(): string {
    return 'post: submissions';
  }

  getResults(): string {
    return 'get: results';
  }
}
