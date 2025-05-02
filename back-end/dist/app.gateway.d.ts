import { Server, Socket } from 'socket.io';
import { MessageService } from './message/message.service';
import { CreateMessageDto } from './message/dto/create-message.dto';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';
export declare class AppGateway {
    private readonly messageService;
    private readonly authService;
    private readonly userService;
    constructor(messageService: MessageService, authService: AuthService, userService: UserService);
    private logger;
    server: Server;
    handleMessage(newMessage: CreateMessageDto, client: Socket): Promise<void>;
    handleMessages(client: Socket): Promise<void>;
    handleUsers(client: Socket): Promise<void>;
    handleLogin(newLogin: CreateUserDto, client: Socket): Promise<void>;
    handleRegister(newLogin: CreateUserDto, client: Socket): Promise<void>;
}
