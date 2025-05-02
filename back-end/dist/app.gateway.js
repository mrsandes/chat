"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_service_1 = require("./message/message.service");
const create_message_dto_1 = require("./message/dto/create-message.dto");
const auth_service_1 = require("./auth/auth.service");
const user_service_1 = require("./user/user.service");
const create_user_dto_1 = require("./user/dto/create-user.dto");
let AppGateway = class AppGateway {
    messageService;
    authService;
    userService;
    constructor(messageService, authService, userService) {
        this.messageService = messageService;
        this.authService = authService;
        this.userService = userService;
    }
    logger = new common_1.Logger('AppGateway');
    server;
    async handleMessage(newMessage, client) {
        this.messageService.create(newMessage);
        this.server.emit('newMessage', newMessage);
        this.logger.log('Message received: ' + JSON.stringify(newMessage));
    }
    async handleMessages(client) {
        const messages = await this.messageService.findAll();
        client.emit('messages', messages);
    }
    async handleUsers(client) {
        const users = await this.userService.findAll();
        client.emit('users', users);
    }
    async handleLogin(newLogin, client) {
        const user = await this.authService.login(newLogin);
        client.emit('loginResponse', user);
    }
    async handleRegister(newLogin, client) {
        const user = await this.authService.register(newLogin);
        client.emit('registerResponse', user);
        const users = await this.userService.findAll();
        this.server.emit('users', users);
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMessages'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUsers'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('login'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleLogin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('register'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleRegister", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService,
        user_service_1.UserService])
], AppGateway);
//# sourceMappingURL=app.gateway.js.map