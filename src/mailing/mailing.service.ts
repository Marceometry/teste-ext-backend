import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailingService {
  async sendEmail(to: string, subject: string, text: string) {
    if (!process.env.MAIL_USER || !process.env.MAIL_HOST) return;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('\nEmail sent: ' + info.response + '\n');
    } catch (error) {
      console.error('\nError sending email: ', error, '\n');
    }
  }
}
