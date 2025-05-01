import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { StringDecoder } from 'node:string_decoder';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  
  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: StringDecoder): void {
    this.server.emit('msgToCliente', payload, client.id);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
