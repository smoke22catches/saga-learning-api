import { Module } from '@nestjs/common';
import { LearningPathsController } from './learning-paths.controller';
import { LearningPathsService } from './learning-paths.service';
import { OpenaiModule } from '../openai/openai.module';
import { BullModule } from '@nestjs/bullmq';
import { LEARNING_PATHS_GENERATION_QUEUE_NAME } from './constants';
import { LearningPathProcessor } from './processors/learning-path.processor';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LearningPath,
  LearningPathSchema,
} from './schemas/learning-path.schema';
import { Lesson, LessonSchema } from './schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LearningPath.name,
        schema: LearningPathSchema,
      },
      {
        name: Lesson.name,
        schema: LessonSchema,
      },
    ]),
    BullModule.registerQueue({ name: LEARNING_PATHS_GENERATION_QUEUE_NAME }),
    OpenaiModule,
  ],
  controllers: [LearningPathsController],
  providers: [LearningPathsService, LearningPathProcessor],
})
export class LearningPathsModule {}
