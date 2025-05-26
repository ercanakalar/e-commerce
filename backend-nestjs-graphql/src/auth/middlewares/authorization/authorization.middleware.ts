import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { IAuthPayload } from 'src/auth/interface/auth.interface';
import { PasswordService } from 'src/auth/password.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
    private readonly passwordService: PasswordService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    try {
      const userRole: IAuthPayload = req.currentAuth;

      if (userRole.role === 'admin') {
        next();
      } else {
        throw new BadRequestException(
          'You are not authorized to access this route',
        );
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
