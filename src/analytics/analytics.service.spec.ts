import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AnalyticsService } from './analytics.service';
import { Ticket, TicketDocument } from './../ticket/schemas/ticket.schema';

describe('AnalyticsService', () => {
  let mock: Model<TicketDocument>;
  let service: AnalyticsService;
  const from = new Date('2021-09-10T00:54:37.719Z');
  const to = new Date('2021-09-20T00:54:37.719Z');
  const algResolve = [
    {
      id: '',
      creationDate: new Date(),
      customerName: '',
      performanceTitle: '',
      performanceTime: new Date('2021-09-11T00:54:37.719Z'),
      ticketPrice: 180,
    },
    {
      id: '',
      creationDate: new Date(),
      customerName: '',
      performanceTitle: '',
      performanceTime: new Date('2021-09-12T00:54:37.719Z'),
      ticketPrice: 200,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        {
          provide: getModelToken(Ticket.name),
          useValue: Model,
        },
      ],
    }).compile();

    mock = module.get<Model<TicketDocument>>(getModelToken(Ticket.name));
    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check whether both earned are equal', async () => {
    const aggregation = [{ month: 'September', summaryProfit: 380 }];
    jest.spyOn(mock, 'aggregate').mockResolvedValue(aggregation);

    const aggResult = await service.getEarningByAggregation(from, to);
    jest.spyOn(mock, 'aggregate').mockImplementation(async () => algResolve);

    const algResult = await service.getEarningByAlgorithm(from, to);
    expect(aggResult).toStrictEqual(algResult);
  });

  it('should check whether both visited are equal', async () => {
    const aggregation = [{ month: 'September', summaryVisits: 2 }];
    jest.spyOn(mock, 'aggregate').mockResolvedValue(aggregation);

    const aggResult = await service.getVisitedByAggregation(from, to);
    jest.spyOn(mock, 'aggregate').mockResolvedValue(algResolve);

    const algResult = await service.getVisitedByAlgorithm(from, to);
    expect(aggResult).toStrictEqual(algResult);
  });
});
