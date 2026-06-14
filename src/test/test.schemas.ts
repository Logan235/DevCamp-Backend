import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
class GeneratedFor {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  @Prop({ type: String })
  targetWeakness?: string;
}

@Schema({ _id: false })
class StorageRef {
  @Prop({ type: String })
  inputUrl?: string;

  @Prop({ type: String })
  outputUrl?: string;
}

@Schema({ timestamps: true })
export class TestCase extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Challenge', required: true })
  challengeId: Types.ObjectId;

  @Prop({ type: String, required: true })
  input: string;

  @Prop({ type: String, required: true })
  expectedOutput: string;

  @Prop({
    type: String,
    required: true,
    enum: ['sample', 'hidden', 'stress', 'generated'],
  })
  type: string;

  @Prop({ type: GeneratedFor })
  generatedFor?: GeneratedFor;

  @Prop({ type: StorageRef })
  storageRef?: StorageRef;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const TestCaseSchema = SchemaFactory.createForClass(TestCase);
