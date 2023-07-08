import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class LearningPathGenerationInitDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  topic: string;
}
