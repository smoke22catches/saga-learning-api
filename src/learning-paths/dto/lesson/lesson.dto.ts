import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsString, IsDefined, IsOptional } from 'class-validator';

export class LessonDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => value.toString())
  @IsDefined()
  _id: any;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsDefined()
  title: string;

  @ApiPropertyOptional()
  @Expose()
  @IsString()
  @IsOptional()
  content?: string;
}
