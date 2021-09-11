import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsDto } from './dto/anlytics.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

@Controller('analytics')
@ApiTags('Analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('earned')
  earned(@Query() analyticsDto: AnalyticsDto) {
    return this.analyticsService.getEarnings(analyticsDto);
  }

  @Get('visited')
  visited(@Query() analyticsDto: AnalyticsDto) {
    return this.analyticsService.getVisited(analyticsDto);
  }
}
