import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bussr'),
    TicketModule,
  ],
})
export class AppModule {}
