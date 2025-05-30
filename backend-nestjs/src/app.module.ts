import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    PrismaModule,
    NotificationModule,
    AuthModule,
    UserModule,
    PermissionsModule,
  ],
})
export class AppModule {}
