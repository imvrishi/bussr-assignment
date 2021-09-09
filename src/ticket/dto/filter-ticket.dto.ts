import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterTicketDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  offset: number;
}
