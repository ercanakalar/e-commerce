import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailUser } from './interface/mail.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: IMailUser, subject: string, url: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: subject,
      text: `Hello ${user.name}, please click on the link below to confirm your email address: ${url}`,
    });
  }
}
