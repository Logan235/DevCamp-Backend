import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestCase } from './test.schemas';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(TestCase.name) private testCaseModel: Model<TestCase>,
  ) {}

  getQuestions() {
    return { message: 'get: questions' };
  }

  postSubmissions(body: any) {
    return { message: 'post: submissions', data: body };
  }

  getResults() {
    return { message: 'get: results' };
  }
}
