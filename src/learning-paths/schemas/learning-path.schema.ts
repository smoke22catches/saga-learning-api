import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Lesson } from './lesson.schema';
import { ProcessingStatus, processingStatusValues } from '../types';
import { LearningPathDto } from '../dto/learning-path/learning-path.dto';

@Schema()
export class LearningPath implements LearningPathDto {
  @Prop({ type: Types.ObjectId, auto: true, required: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  topic: string;

  @Prop({ type: [Types.ObjectId], ref: Lesson.name, default: [] })
  lessons: Lesson[];

  @Prop({ enum: processingStatusValues, default: 'pending' })
  status: ProcessingStatus;
}

export type LearningPathDocument = HydratedDocument<LearningPath>;
export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);
