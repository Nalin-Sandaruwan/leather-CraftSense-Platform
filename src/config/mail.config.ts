import { MailerOptions } from '@nestjs-modules/mailer';

export default (): MailerOptions => {
  return {
    transport: {
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASS,
      },
    },
    defaults: {
      from: process.env.MAIL_FROM || 'noreply@pgwaste.com',
    },
  };
};