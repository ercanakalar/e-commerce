import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import {
  IAuthResponse,
  IDecodedToken,
} from 'src/auth/interface/auth.interface';
import { PasswordService } from 'src/auth/password.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProtectMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
    private readonly passwordService: PasswordService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    try {
      if (!req.headers['authorization']) {
        throw new BadRequestException(
          'You are not logged in! Please log in to get access.',
        );
      }

      const token = req.headers['authorization'].split(' ')[1];
      if (token == undefined) {
        throw new BadRequestException('Token not found');
      }

      const decodedToken: IDecodedToken =
        await this.passwordService.decodeToken(token);
      if (!decodedToken) {
        throw new BadRequestException('Invalid token');
      }

      const auth: IAuthResponse = await this.usersRepository.findOne({
        where: { email: decodedToken.email },
      });

      if (!auth) {
        return res.status(401).json({
          status: 'failed',
          message: 'You are not authorized to access this resource',
        });
      }

      const passwordChangeTime = new Date(auth.password_changed_at).getTime();

      const isPasswordChanged = this.passwordService.changedPasswordAfter(
        decodedToken.iat,
        passwordChangeTime / 1000,
      );

      if (isPasswordChanged) {
        throw new BadRequestException(
          'Auth recently changed password! Please log in again.',
        );
      }

      req.currentAuth = {
        id: auth.id,
        firstName: auth.first_name,
        lastName: auth.last_name,
        email: auth.email,
        role: auth.role,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };

      next();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
