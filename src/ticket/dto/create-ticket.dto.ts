import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  @IsAlpha()
  customerName: string;

  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  performanceTitle: string;

  @ApiProperty()
  @IsDate()
  performanceTime: Date;

  @ApiProperty()
  @IsNumber()
  ticketPrice: number;
}
