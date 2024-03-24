import nodemailer, { Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();
export class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;
  transporter: Transporter;

  constructor(auth: { email: string; first_name: string }, url: string) {
    this.to = auth.email;
    this.firstName = auth.first_name;
    this.url = url;
    this.from = `Ercan Akalar <${process.env.EMAIL_FROM!}>`;
    this.transporter = this.newTransport();
  }

  private newTransport() {
    const transport  = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: Number(process.env.EMAIL_PORT!),
      secure: false, // false for TLS, true for SSL
      auth: {
        user: process.env.EMAIL_HOST_AUTH!,
        pass: process.env.EMAIL_HOST_PASSWORD!,
      },
    });
    return transport;
  }

  // Send the actual email
  async send(template: string, subject: string) {
    // 1) Render HTML based on a pug template (You can uncomment this if using Pug templates)
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject,
    // });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: this.url, // You can replace this with HTML content if needed
      // html, // Uncomment this if using HTML content
    };

    // 3) Send email using the transporter
    await this.transporter.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Ercan WorkPlace!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 5 minutes)'
    );
  }
}
