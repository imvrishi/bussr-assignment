import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MSchema, Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({
    auto: true,
    type: MSchema.Types.ObjectId,
  })
  id: string;

  @Prop()
  creationDate: Date;

  @Prop()
  customerName: string;

  @Prop()
  performanceTitle: string;

  @Prop()
  performanceTime: Date;

  @Prop()
  ticketPrice: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
