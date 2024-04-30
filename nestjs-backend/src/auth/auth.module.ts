import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { AuthResolver } from './auth.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { DataSource } from 'typeorm';
import { TokenPasswordMiddleware } from './middlewares/token-password/token-password.middleware';
import { ProtectMiddleware } from './middlewares/protect/protect.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(), // Import and configure ConfigModule
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/auth',
      include: [AuthModule],
    }),
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthResolver, AuthService], // Removed JwtService from providers
})
export class AuthModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenPasswordMiddleware).forRoutes('/auth/currentauth');
    consumer
      .apply(ProtectMiddleware)
      .forRoutes('/auth/currentauth', '/auth/update-password');
  }
}
