import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service'; 
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, 
  ) {}

  private logger: Logger = new Logger('AuthService');

  async login(loginDto: CreateUserDto) {
    const user = await this.userService.findOneByUsername(loginDto.username);

    if (!user) {
      this.logger.error('Usuário não encontrado');
      return null;
    }

    if (loginDto.password !== user.password) {
      this.logger.error('Senha incorreta');
      return null;
    }

    return true;
  }

  async register(loginDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByUsername(loginDto.username);
    if (existingUser) {
      this.logger.error('Usuário já existe');
      return null;
    }

    await this.userService.create({
      username: loginDto.username,
      password: loginDto.password,
    });

    return true; 
  }
}