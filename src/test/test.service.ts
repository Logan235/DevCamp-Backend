import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TestCase } from './test.schemas';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(TestCase.name) private readonly testCaseModel: Model<TestCase>,
  ) {}

  // 1. Lấy danh sách các Sample Test Cases công khai của một bài tập để làm câu hỏi mẫu
  async getQuestions(challengeId: string) {
    if (!Types.ObjectId.isValid(challengeId)) {
      throw new BadRequestException(
        'ID bài tập (challengeId) không đúng định dạng',
      );
    }

    const sampleTestcases = await this.testCaseModel
      .find({
        challengeId: new Types.ObjectId(challengeId),
        type: 'sample',
        isActive: true,
      })
      .select('input expectedOutput type')
      .exec();

    return {
      challengeId,
      totalQuestions: sampleTestcases.length,
      questions: sampleTestcases,
    };
  }

  // 2. Tiếp nhận mã nguồn nộp lên, chạy thử với toán bộ test cases (gồm cả test case ẩn) và chấm điểm
  async postSubmissions(body: {
    challengeId: string;
    userCodeOutput: string[];
  }) {
    const { challengeId, userCodeOutput } = body;

    if (!challengeId || !userCodeOutput || !Array.isArray(userCodeOutput)) {
      throw new BadRequestException(
        'Dữ liệu truyền lên không đầy đủ hoặc sai định dạng',
      );
    }

    // Lấy toàn bộ các test cases đang kích hoạt của bài tập này để đối chiếu (Cả sample và hidden)
    const allTestCases = await this.testCaseModel
      .find({ challengeId: new Types.ObjectId(challengeId), isActive: true })
      .exec();

    if (!allTestCases || allTestCases.length === 0) {
      throw new NotFoundException(
        'Không tìm thấy dữ liệu Test Cases cho bài tập này',
      );
    }

    let passedCount = 0;
    const details: {
      testCaseId: any;
      type: string;
      status: string;
      input: string;
      expected: string;
      actual: string;
    }[] = [];

    // Giả lập cơ chế chấm điểm: So sánh output của user gửi lên với đáp án expectedOutput trong DB
    allTestCases.forEach((testcase, index) => {
      // Vì userCodeOutput là mảng, ta so sánh theo thứ tự tương ứng gửi lên
      const userSingleOutput = userCodeOutput[index]?.trim();
      const expected = testcase.expectedOutput?.trim();

      const isCorrect = userSingleOutput === expected;
      if (isCorrect) passedCount++;

      details.push({
        testCaseId: testcase._id,
        type: testcase.type,
        status: isCorrect ? 'Passed' : 'Failed',
        // Nếu là test case ẩn (hidden) thì không trả về input/output để bảo mật đề bài
        input:
          testcase.type === 'sample' ? testcase.input : '⚠️ Hidden Test Case',
        expected: testcase.type === 'sample' ? expected : '⚠️ Hidden Test Case',
        actual:
          testcase.type === 'sample'
            ? userSingleOutput
            : isCorrect
              ? 'Match'
              : 'Mismatch',
      });
    });

    const scorePercentage = Math.round(
      (passedCount / allTestCases.length) * 100,
    );

    return {
      challengeId,
      status: scorePercentage === 100 ? 'Accepted' : 'Wrong Answer',
      score: scorePercentage,
      passed: `${passedCount}/${allTestCases.length}`,
      details,
    };
  }

  // 3. Lấy lại kết quả thống kê hoặc báo cáo tổng quan của hệ thống testcase
  async getResults(challengeId: string) {
    if (!Types.ObjectId.isValid(challengeId)) {
      throw new BadRequestException('ID bài tập không đúng định dạng');
    }

    const summary = await this.testCaseModel.aggregate([
      {
        $match: {
          challengeId: new Types.ObjectId(challengeId),
          isActive: true,
        },
      },
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    return {
      challengeId,
      message: 'Thống kê cấu trúc test cases hiện tại',
      summary,
    };
  }
}
