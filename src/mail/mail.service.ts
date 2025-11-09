import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private loadTemplate(templateName: string, variables: Record<string, string>): string {
    // Use src directory at runtime instead of dist
    const templatePath = path.join(process.cwd(), 'src', 'mail', 'template', `${templateName}.html`);
    let template = fs.readFileSync(templatePath, 'utf-8');
    
    Object.keys(variables).forEach(key => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]);
    });
    
    return template;
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text,
        html: html || text,
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendWelcomeEmail(email: string, name: string) {
    const html = this.loadTemplate('welcome', {
      name,
      link: 'https://pgwaste.com/get-started',
    });

    await this.sendEmail(
      email,
      'Welcome to PG Waste',
      `Hello ${name}, welcome to our platform!`,
      html,
    );
  }
}