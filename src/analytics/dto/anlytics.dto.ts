import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum } from 'class-validator';
import { AnalyticsMethod } from './../enums';

export class AnalyticsDto {
  @ApiProperty({
    enum: AnalyticsMethod,
    default: AnalyticsMethod.AGGREGATION,
  })
  @IsEnum(AnalyticsMethod)
  method: AnalyticsMethod;

  @ApiProperty({
    default: '2021-09-10T00:54:37.719Z',
  })
  @IsDate()
  fromDate: Date;

  @ApiProperty({
    default: '2021-09-20T00:54:37.719Z',
  })
  @IsDate()
  toDate: Date;
}
