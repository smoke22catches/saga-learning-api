import { Injectable, NotFoundException } from '@nestjs/common';
import { LearningPathGenerationInitDto } from './dto/learning-path/learning-path-generation-init.dto';
import { OpenaiService } from '../openai/openai.service';
import {
  GENERATE_LEARNING_PLAN_INITIAL_MESSAGE,
  LEARNING_PATHS_GENERATION_QUEUE_NAME,
} from './constants';
import { ChatCompletionRequestMessage } from 'openai';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { LearningPath } from './schemas/learning-path.schema';
import { Model, Types } from 'mongoose';
import { Lesson } from './schemas/lesson.schema';
import { LearningPathDto } from './dto/learning-path/learning-path.dto';

@Injectable()
export class LearningPathsService {
  constructor(
    private openaiService: OpenaiService,
    @InjectModel(LearningPath.name)
    private learningPathModel: Model<LearningPath>,
    @InjectModel(Lesson.name)
    private lessonModel: Model<Lesson>,
    @InjectQueue(LEARNING_PATHS_GENERATION_QUEUE_NAME)
    private queue: Queue,
  ) {}

  async startGeneratingLearningPath(
    data: LearningPathGenerationInitDto,
  ): Promise<LearningPathDto> {
    const learningPath = await this.learningPathModel.create({
      _id: new Types.ObjectId(),
      topic: data.topic,
      status: 'pending',
    });
    await learningPath.save();
    await this.queue.add('generate-learning-path', learningPath);
    return learningPath;
  }

  async generateLessonsTitlesForLearningPath(
    learningPathData: LearningPathDto,
  ) {
    const learningPath = await this.learningPathModel.findById(
      new Types.ObjectId(learningPathData._id),
    );

    // setup chat for generating learning path from topic
    const chat: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: GENERATE_LEARNING_PLAN_INITIAL_MESSAGE,
      },
      {
        role: 'user',
        content: learningPath.topic,
      },
    ];

    // get learning path from chat
    const chatCompletion = await this.openaiService.createChatCompletion(chat);
    const learningPathString = chatCompletion.choices[0].message.content;

    // save lessons to learning path
    for (const lessonTitle of learningPathString.split('\n')) {
      const lesson = await this.lessonModel.create({
        _id: new Types.ObjectId(),
        title: lessonTitle,
      });
      learningPath.lessons.push(lesson);
    }

    learningPath.status = 'completed';
    await learningPath.save();
  }

  async getLearningPath(id: string): Promise<LearningPathDto> {
    const objectId = new Types.ObjectId(id);
    const learningPath = await this.learningPathModel
      .findById(objectId)
      .populate('lessons');

    if (!learningPath) {
      throw new NotFoundException();
    }

    return learningPath;
  }
}
