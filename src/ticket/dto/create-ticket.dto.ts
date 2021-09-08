import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  customerName: string;

  @ApiProperty()
  performanceTitle: string;

  @ApiProperty()
  performanceTime: Date;

  @ApiProperty()
  ticketPrice: number;
}
