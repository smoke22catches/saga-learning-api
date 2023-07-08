import { Expose, Type } from 'class-transformer';
import { IsDefined, IsEnum, IsString } from 'class-validator';
import { LessonDto } from '../lesson/lesson.dto';
import { ProcessingStatus, processingStatusValues } from '../../types';
import { ApiProperty } from '@nestjs/swagger';

export class LearningPathDto {
  @ApiProperty()
  @Expose()
  @IsDefined()
  _id: any;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  topic: string;

  @ApiProperty({ type: [LessonDto] })
  @Expose()
  @Type(() => LessonDto)
  lessons: LessonDto[];

  @ApiProperty({ type: String, enum: processingStatusValues })
  @Expose()
  @IsEnum(processingStatusValues)
  status: ProcessingStatus;
}
