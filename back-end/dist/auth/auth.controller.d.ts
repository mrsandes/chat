import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: CreateUserDto): Promise<true | null>;
    register(loginDto: CreateUserDto): Promise<true | null>;
}
