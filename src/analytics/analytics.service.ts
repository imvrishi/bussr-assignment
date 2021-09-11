import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './../ticket/schemas/ticket.schema';
import { AnalyticsDto } from './dto/anlytics.dto';
import { AnalyticsMethod } from './enums';
import { Earned, Visited } from './types';

const monthList = [
  ,
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  getEarnings(analyticsDto: AnalyticsDto): Promise<Array<Earned>> {
    switch (analyticsDto.method) {
      case AnalyticsMethod.ALGORITHM:
        return this.getEarningByAlgorithm(
          analyticsDto.fromDate,
          analyticsDto.toDate,
        );
      case AnalyticsMethod.AGGREGATION:
      default:
        return this.getEarningByAggregation(
          analyticsDto.fromDate,
          analyticsDto.toDate,
        );
    }
  }

  async getEarningByAggregation(
    fromDate: Date,
    toDate: Date,
  ): Promise<Array<Earned>> {
    const rows = await this.ticketModel.aggregate([
      {
        $match: {
          performanceTime: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$performanceTime' },
            year: { $year: '$performanceTime' },
          },
          summaryProfit: { $sum: '$ticketPrice' },
        },
      },
      {
        $project: {
          month: '$_id.month',
          summaryProfit: '$summaryProfit',
          _id: 0,
        },
      },
      {
        $addFields: {
          month: {
            $let: {
              vars: {
                monthsInString: monthList,
              },
              in: {
                $arrayElemAt: ['$$monthsInString', '$month'],
              },
            },
          },
        },
      },
    ]);

    return rows;
  }

  async getEarningByAlgorithm(
    fromDate: Date,
    toDate: Date,
  ): Promise<Array<Earned>> {
    const rows = await this.ticketModel.find({
      performanceTime: { $gte: fromDate, $lte: toDate },
    });

    const groupBy: Record<string, number> = {};
    for (const row of rows) {
      const y = row.performanceTime.getFullYear();
      const m = row.performanceTime.getMonth() + 1;
      groupBy[`${y}:${m}`] = (groupBy[`${y}:${m}`] || 0) + row.ticketPrice;
    }

    const final: Array<Earned> = [];
    for (const key in groupBy) {
      const month = key.split(':')[1];
      const summaryProfit = groupBy[key];
      final.push({
        month: monthList[+month],
        summaryProfit,
      });
    }

    return final;
  }

  getVisited(analyticsDto: AnalyticsDto): Promise<Array<Visited>> {
    switch (analyticsDto.method) {
      case AnalyticsMethod.ALGORITHM:
        return this.getVisitedByAlgorithm(
          analyticsDto.fromDate,
          analyticsDto.toDate,
        );
      case AnalyticsMethod.AGGREGATION:
      default:
        return this.getVisitedByAggregation(
          analyticsDto.fromDate,
          analyticsDto.toDate,
        );
    }
  }

  async getVisitedByAggregation(
    fromDate: Date,
    toDate: Date,
  ): Promise<Array<Visited>> {
    const rows = await this.ticketModel.aggregate([
      {
        $match: {
          performanceTime: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$performanceTime' },
            year: { $year: '$performanceTime' },
          },
          summaryVisits: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id.month',
          summaryVisits: '$summaryVisits',
          _id: 0,
        },
      },
      {
        $addFields: {
          month: {
            $let: {
              vars: {
                monthsInString: monthList,
              },
              in: {
                $arrayElemAt: ['$$monthsInString', '$month'],
              },
            },
          },
        },
      },
    ]);

    return rows;
  }

  async getVisitedByAlgorithm(
    fromDate: Date,
    toDate: Date,
  ): Promise<Array<Visited>> {
    const rows = await this.ticketModel.find({
      performanceTime: { $gte: fromDate, $lte: toDate },
    });

    const groupBy: Record<string, number> = {};
    for (const row of rows) {
      const y = row.performanceTime.getFullYear();
      const m = row.performanceTime.getMonth() + 1;
      groupBy[`${y}:${m}`] = (groupBy[`${y}:${m}`] || 0) + 1;
    }

    const final: Array<Visited> = [];
    for (const key in groupBy) {
      const month = key.split(':')[1];
      const summaryVisits = groupBy[key];
      final.push({
        month: monthList[+month],
        summaryVisits,
      });
    }

    return final;
  }
}
