import nodemailer from 'nodemailer';
import { MailAdapter, MailAdapterDTO } from "../interfaces/mail.adapter.interface";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1bdde0c5f871a3",
        pass: "62acc93e38ed5e"
    }
});

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({ subject, body }: MailAdapterDTO) {
        await transport.sendMail({
            from: 'Equipe Feedback Widget <equipe@feedget.com>',
            to: 'Vinicius Prata  <vinicius.prata.kloh@gmail.com>',
            subject,
            html: body
        });
    };
}