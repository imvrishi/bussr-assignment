import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/bussr',
      }),
    }),
    TicketModule,
    AuthModule,
    UsersModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
