import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { Ticket } from './schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findById(id);
  }

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }
}
