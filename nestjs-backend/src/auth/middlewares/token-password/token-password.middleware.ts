import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { IDecodedToken } from 'src/auth/interface/auth.interface';

@Injectable()
export class TokenPasswordMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers['authorization'];

      if (!authorization) {
        throw new BadRequestException(
          'You are not logged in! Please log in to get access.',
        );
      }
      const token = authorization.split(' ')[1];

      if (token == undefined) {
        throw new BadRequestException('Token not found');
      }

      const decodedToken: IDecodedToken =
        await this.authService.decodeToken(token);

      if (!decodedToken) {
        throw new BadRequestException('Invalid token');
      }

      const time = decodedToken.exp;

      const now = Date.now();

      if (now / 1000 < time) {
        return next();
      } else {
        res.status(401).json({ message: 'Token is expired' });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
