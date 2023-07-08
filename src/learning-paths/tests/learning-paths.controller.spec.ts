import { Test, TestingModule } from '@nestjs/testing';
import { LearningPathsController } from '../learning-paths.controller';
import { LearningPathsService } from '../learning-paths.service';
import { learningPathGenerationInitStub } from './stubs/learning-path-generation-init.stub';

jest.mock('../learning-paths.service');

describe('LearningPathsController', () => {
  let controller: LearningPathsController;
  let service: LearningPathsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningPathsController],
      providers: [LearningPathsService],
    }).compile();

    controller = module.get<LearningPathsController>(LearningPathsController);
    service = module.get<LearningPathsService>(LearningPathsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when startGeneratingLearningPath is called', () => {
    beforeEach(async () => {
      await controller.startGeneratingLearningPath(
        learningPathGenerationInitStub,
      );
    });

    it('then it should call service', () => {
      expect(service.startGeneratingLearningPath).toHaveBeenCalled();
    });
  });
});
