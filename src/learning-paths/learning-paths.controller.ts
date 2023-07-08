import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LearningPathGenerationInitDto } from './dto/learning-path/learning-path-generation-init.dto';
import { LearningPathsService } from './learning-paths.service';
import { plainToInstance } from 'class-transformer';
import { LearningPathDto } from './dto/learning-path/learning-path.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Learning paths')
@Controller('learning-paths')
export class LearningPathsController {
  constructor(private learningPathService: LearningPathsService) {}

  @ApiCreatedResponse({ type: LearningPathDto })
  @Post()
  async startGeneratingLearningPath(
    @Body() data: LearningPathGenerationInitDto,
  ): Promise<LearningPathDto> {
    const learningPath =
      await this.learningPathService.startGeneratingLearningPath(data);
    return learningPath;
  }

  @ApiOkResponse({ type: LearningPathDto })
  @ApiNotFoundResponse()
  @Get(':id')
  async getLearningPath(@Param('id') id: string): Promise<LearningPathDto> {
    const learningPath = await this.learningPathService.getLearningPath(id);
    return plainToInstance(LearningPathDto, learningPath, {
      strategy: 'excludeAll',
    });
  }
}
