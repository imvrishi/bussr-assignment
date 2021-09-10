import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MSchema, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    auto: true,
    type: MSchema.Types.ObjectId,
  })
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  creationDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
