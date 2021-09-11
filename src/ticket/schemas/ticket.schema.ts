import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop()
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
