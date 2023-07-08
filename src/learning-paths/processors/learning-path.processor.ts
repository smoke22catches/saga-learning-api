import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LEARNING_PATHS_GENERATION_QUEUE_NAME } from '../constants';
import { LearningPathsService } from '../learning-paths.service';
import { LearningPathDto } from '../dto/learning-path/learning-path.dto';

@Processor(LEARNING_PATHS_GENERATION_QUEUE_NAME)
export class LearningPathProcessor extends WorkerHost {
  constructor(private service: LearningPathsService) {
    super();
  }

  async process(job: Job<LearningPathDto, void, string>) {
    await this.service.generateLessonsTitlesForLearningPath(job.data);
  }
}
