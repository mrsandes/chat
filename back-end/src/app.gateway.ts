import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessageService } from './message/message.service';
import { CreateMessageDto } from './message/dto/create-message.dto';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@WebSocketGateway({ cors: true})
export class AppGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  
  private logger: Logger = new Logger('AppGateway');
  
  @WebSocketServer() server: Server;
  
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() newMessage: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.messageService.create(newMessage);
    this.server.emit('newMessage', newMessage);
    this.logger.log('Message received: ' + JSON.stringify(newMessage));    
  }

  @SubscribeMessage('getMessages')
  async handleMessages(
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.messageService.findAll();
    client.emit('messages', messages);
  }

  @SubscribeMessage('getUsers')
  async handleUsers(
    @ConnectedSocket() client: Socket,
  ) {
    const users = await this.userService.findAll();
    client.emit('users', users);
  }

  @SubscribeMessage('login')
  async handleLogin(
    @MessageBody() newLogin: CreateUserDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.authService.login(newLogin);
    client.emit('loginResponse', user);
  }

  @SubscribeMessage('register')
  async handleRegister(
    @MessageBody() newLogin: CreateUserDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.authService.register(newLogin);
    client.emit('registerResponse', user);

    const users = await this.userService.findAll();
    this.server.emit('users', users);
  }
}
