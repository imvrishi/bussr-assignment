import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    default: 'bussr',
  })
  @IsString()
  @IsAlpha()
  customerName: string;

  @ApiProperty({
    default: 'bussr',
  })
  @IsString()
  @IsAlphanumeric()
  performanceTitle: string;

  @ApiProperty()
  @IsDate()
  performanceTime: Date;

  @ApiProperty({
    default: 200,
  })
  @IsNumber()
  ticketPrice: number;
}
