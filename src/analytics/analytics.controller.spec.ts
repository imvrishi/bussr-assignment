import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './../ticket/schemas/ticket.schema';
import { AnalyticsMethod } from './enums';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsController', () => {
  let service: AnalyticsService;
  let controller: AnalyticsController;
  const methodAgg = {
    method: AnalyticsMethod.AGGREGATION,
    fromDate: new Date(),
    toDate: new Date(),
  };
  const methodAlg = {
    method: AnalyticsMethod.ALGORITHM,
    fromDate: new Date(),
    toDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        AnalyticsService,
        {
          provide: getModelToken(Ticket.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
    controller = module.get<AnalyticsController>(AnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('earned', async () => {
    jest.spyOn(service, 'getEarnings').mockResolvedValue([]);

    const agg = await controller.earned(methodAgg);
    const alg = await controller.earned(methodAlg);

    expect(agg).toStrictEqual(alg);
  });

  it('visited', async () => {
    jest.spyOn(service, 'getVisited').mockResolvedValue([]);

    const agg = await controller.visited(methodAgg);
    const alg = await controller.visited(methodAlg);

    expect(agg).toStrictEqual(alg);
  });
});
