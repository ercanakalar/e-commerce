import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenPasswordMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
      throw new Error('Token not found');
    }

    const decodedToken: any = await this.authService.decodeToken(token);

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    const time = decodedToken.exp;

    const now = Date.now();

    if (now / 1000 < time) {
      return next();
    } else {
      res.status(401).json({ message: 'Token is expired' });
    }
  }
}
