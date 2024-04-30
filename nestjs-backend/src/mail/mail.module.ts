import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: process.env.EMAIL_HOST!,
        port: Number(process.env.EMAIL_PORT!),
        secure: false, // false for TLS, true for SSL
        auth: {
          user: process.env.EMAIL_HOST_AUTH!,
          pass: process.env.EMAIL_HOST_PASSWORD!,
        },
      },
      defaults: {
        from: `Ercan Akalar <${process.env.EMAIL_FROM!}>`,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
