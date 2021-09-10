import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterTicketDto {
  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  offset: number;
}
