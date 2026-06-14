import { Controller, Get, Post, Param, Body, Request } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get() // exercises/me
  getExercises(@Request() req: any) {
    const userId = req.user?.id || '123456789abcdefghijkl';
    return this.exerciseService.getExercises(userId);
  }

  @Get(':id') // exercises/:id
  getExerciseById(@Param('id') id: string) {
    return this.exerciseService.getExerciseById(id);
  }

  @Post(':id') // exercises/:id
  postExercise(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { language: string; code: string },
  ) {
    const userId = req.user?.id || '123456789abcdefghijkl';
    return this.exerciseService.postExercise(userId, id, body);
  }
}
