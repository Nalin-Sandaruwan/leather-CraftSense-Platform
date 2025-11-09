import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send')
    async sendTestEmail(
        @Body() body: { email: string; name: string;  },
    ) {
        await this.mailService.sendWelcomeEmail(body.email, body.name);
    }

}