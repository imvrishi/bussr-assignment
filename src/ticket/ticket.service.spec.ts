import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { TicketService } from './ticket.service';
import { Ticket, TicketDocument } from './../ticket/schemas/ticket.schema';

describe('TicketService', () => {
  let mock: Model<TicketDocument>;
  let service: TicketService;
  const createTicketDto = {
    customerName: '',
    performanceTitle: '',
    performanceTime: new Date(),
    ticketPrice: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getModelToken(Ticket.name),
          useValue: Model,
        },
      ],
    }).compile();

    mock = module.get<Model<TicketDocument>>(getModelToken(Ticket.name));
    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a ticket', async () => {
    const ticket = new Ticket();
    ticket.customerName = '';
    jest.spyOn(mock, 'create').mockImplementation(async () => ticket);

    const row = await service.create(createTicketDto);
    expect(row.customerName).toBe(ticket.customerName);
  });

  it('should find all tickets', async () => {
    jest.spyOn(mock, 'aggregate').mockResolvedValue([]);

    expect(
      await service.findAll({
        limit: 10,
        offset: 0,
      }),
    ).toStrictEqual([]);
  });

  it('should find a ticket by id', async () => {
    const ticket = new Ticket();
    ticket.customerName = '';
    jest.spyOn(mock, 'findById').mockResolvedValue(ticket as TicketDocument);

    const row = await service.findById('');
    expect(row.customerName).toBe(ticket.customerName);
  });

  it('should update a ticket', async () => {
    jest
      .spyOn(mock, 'updateOne')
      .mockResolvedValue({ nModified: 1 } as UpdateWriteOpResult);

    const promise = service.update('', createTicketDto);
    await expect(promise).resolves.toBe(undefined);
  });

  it('should delete a ticket', async () => {
    jest.spyOn(mock, 'deleteOne').mockResolvedValue({ deletedCount: 1 });

    const promise = service.delete('');
    await expect(promise).resolves.toBe(undefined);
  });
});
