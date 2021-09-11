import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

describe('TicketController', () => {
  let service: TicketService;
  let controller: TicketController;
  const createTicketDto = {
    customerName: '',
    performanceTitle: '',
    performanceTime: new Date(),
    ticketPrice: 0,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        TicketService,
        {
          provide: getModelToken(Ticket.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = app.get<TicketService>(TicketService);
    controller = app.get<TicketController>(TicketController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('should create a ticket', async () => {
    const ticket = new Ticket();
    ticket.customerName = '';
    jest.spyOn(service, 'create').mockResolvedValue(ticket);

    const row = await controller.create(createTicketDto);
    expect(row.customerName).toBe(ticket.customerName);
  });

  it('should find all tickets', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);

    expect(
      await controller.findAll({
        limit: 10,
        offset: 0,
      }),
    ).toStrictEqual([]);
  });

  it('should find a ticket by id', async () => {
    const ticket = new Ticket();
    ticket.customerName = '';
    jest.spyOn(service, 'findById').mockResolvedValue(ticket);

    const row = await controller.findById('');
    expect(row.customerName).toStrictEqual(ticket.customerName);
  });

  it('should update a ticket', async () => {
    jest.spyOn(service, 'update').mockResolvedValue();

    const promise = controller.update('', createTicketDto);
    await expect(promise).resolves.toBe(undefined);
  });

  it('should delete a ticket', async () => {
    jest.spyOn(service, 'delete').mockImplementation(async () => {
      return;
    });

    const promise = controller.delete('');
    await expect(promise).resolves.toBe(undefined);
  });
});
