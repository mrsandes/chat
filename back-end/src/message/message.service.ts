import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const newMessage =  this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(newMessage);
  }

  findAll() {
    return this.messageRepository.find();
  }

  findPrivateMessages(client: string) {
    return this.messageRepository.find({ where: [{ senderName: client }, { receiverName: client }]});
  }
}
