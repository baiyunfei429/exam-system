import { Injectable } from '@nestjs/common';
import {createTransport, Transporter} from 'nodemailer';

@Injectable()
export class EmailService {
    transporter: Transporter

    constructor() {
        this.transporter = createTransport({
          host: 'smtp.qq.com',
          port: '587',
          secure: false,
          auth: {
              user: '1807596571@qq.com',
              pass: '1111'
          },
      });
    }

    async sendMail({ to, subject, html }: any) {
      await this.transporter.sendMail({
        from: {
          name: '考试系统',
          address: '1807596571@qq.com'
        },
        to,
        subject,
        html
      });
    }
}
