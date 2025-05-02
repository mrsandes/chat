import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    private logger;
    login(loginDto: CreateUserDto): Promise<true | null>;
    register(loginDto: CreateUserDto): Promise<true | null>;
}
