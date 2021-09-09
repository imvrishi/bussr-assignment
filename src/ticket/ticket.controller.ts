import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { Ticket } from './schemas/ticket.schema';
import { FilterTicketDto } from './dto/filter-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
@ApiTags('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll(@Query() filterTicketDto: FilterTicketDto): Promise<Ticket[]> {
    return this.ticketService.findAll(filterTicketDto);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.update(id, createTicketDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketService.delete(id);
  }
}
