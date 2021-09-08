import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async findById(id: string): Promise<Ticket> {
    return this.ticketModel
      .findOne({
        _id: id,
      })
      .exec();
  }

  async create(createCatDto: CreateTicketDto): Promise<Ticket> {
    const createdCat = new this.ticketModel(createCatDto);
    return createdCat.save();
  }
}
