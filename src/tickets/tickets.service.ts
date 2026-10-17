import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
@Injectable()
export class TicketsService {
    private readonly tickets: Ticket[] = [
        { id: 1, 
            subject: 'Cannot Login', 
            description: 'User cannot access the dashboard after login', 
            priority: 'high', 
            status: 'open', 
            createdAt: "2026-01-01T10:00:00.000Z" 
        },
        { id: 2, 
            subject: 'Payment Failed', 
            description: 'User is unable to complete payment', 
            priority: 'medium', 
            status: 'open', 
            createdAt: "2026-01-02T11:30:00.000Z" 
        },
        { id: 3, 
            subject: 'Invoice download not working', 
            description: 'Invoice PDF download returns empty file', 
            priority: 'low', 
            status: 'closed', 
            createdAt: "2026-01-03T12:45:00.000Z" 
        },
    ]
    private nextTicketId=4;

    findAll(status?: Ticket['status'], priority?: Ticket['priority']) {
        let tickets= this.tickets;
        if (status){
            tickets=tickets.filter((ticket)=>ticket.status ===status)
        }
        if (priority){
            tickets=tickets.filter((ticket)=>ticket.priority ===priority)
        }
        if(!tickets.length)
        {
            throw new NotFoundException (`No tickets found with status ${status} and priority ${priority}`);
        }
        return tickets;
    }
    findOne (id:number){
        const ticket = this.tickets.find((ticket) => ticket.id === id);
        if(!ticket){
            throw new NotFoundException (`Ticket with id ${id} not found`);
        }
        return ticket;
    }
    createTicket(createTicketDto: CreateTicketDto){
        const ticket:Ticket ={
            id: this.nextTicketId++,
            subject: createTicketDto.subject,
            description: createTicketDto.description,
            priority: createTicketDto.priority,
            status: 'open',
            createdAt: new Date().toISOString()
        }
        this.tickets.push(ticket);
        return ticket;
    }
    update(id:number, updateTicketDto: UpdateTicketDto){
        const ticket=this.findOne(id);
        if(ticket.status==="closed")
        {
            throw new BadRequestException('Cannot update a closed ticket');
        }
        Object.assign(ticket,updateTicketDto);
        return ticket;
    }

    closeTicket(id:number){
        const ticket=this.findOne(id);
        if(ticket.status==="closed")
        {
            throw new BadRequestException('Ticket already closed');
        }
        ticket.status="closed";
        return ticket;
    }
}
