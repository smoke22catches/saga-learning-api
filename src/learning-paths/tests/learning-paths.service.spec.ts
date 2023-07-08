import { Test, TestingModule } from '@nestjs/testing';
import { LearningPathsService } from '../learning-paths.service';
import { learningPathGenerationInitStub } from './stubs/learning-path-generation-init.stub';
import { OpenaiService } from '../../openai/openai.service';

jest.mock('../../openai/openai.service');

describe('LearningPathsService', () => {
  let service: LearningPathsService;
  let openaiService: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningPathsService, OpenaiService],
    }).compile();

    service = module.get<LearningPathsService>(LearningPathsService);
    openaiService = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when startGeneratingLearningPath is called', () => {
    beforeEach(async () => {
      await service.startGeneratingLearningPath(learningPathGenerationInitStub);
    });

    it('then it should call OpenAI service', () => {
      expect(openaiService.generateLearningPath).toHaveBeenCalled();
    });
  });
});
