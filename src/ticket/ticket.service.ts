import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { FilterTicketDto } from './dto/filter-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { customerName, performanceTitle, performanceTime, ticketPrice } =
      createTicketDto;

    const ticket = new this.ticketModel({
      creationDate: Date.now(),
      customerName,
      performanceTitle,
      performanceTime,
      ticketPrice,
    });
    return ticket.save();
  }

  async findAll(filterTicketDto: FilterTicketDto): Promise<Ticket[]> {
    const offset = filterTicketDto.offset || 0;
    const limit = filterTicketDto.limit || 10;

    return this.ticketModel.find().skip(offset).limit(limit).exec();
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel
      .findOne({
        _id: id,
      })
      .exec();

    if (!ticket) {
      throw new NotFoundException(`Ticket not found`);
    }

    return ticket;
  }

  async update(id: string, createCatDto: CreateTicketDto): Promise<void> {
    const result = await this.ticketModel
      .updateOne({ _id: id }, createCatDto)
      .exec();

    if (result.nModified === 0) {
      throw new NotFoundException(`Ticket not found`);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.ticketModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Ticket not found`);
    }
  }
}
