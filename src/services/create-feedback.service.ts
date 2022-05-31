import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer.mail.adapter";
import { PrismaFeedbacksRepository } from "../repositories/prisma/feedbacks.repository.prisma";

interface CreateFeedbackRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class CreateFeedbackService {

    constructor(
        private prismaFeedbacksRepository: PrismaFeedbacksRepository,
        private nodemailerMailAdapter: NodemailerMailAdapter
    ) { }

    async execute({ type, comment, screenshot }: CreateFeedbackRequest) {

        if (!type) {
            throw new Error('Type is empty.');
        }

        if (!comment) {
            throw new Error('Comment is empty.');
        }


        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }

        this.prismaFeedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        this.nodemailerMailAdapter.sendMail({
            subject: 'New Feedback',
            body: [
                `<div style="font-family: san-serif; font-size: 16px; color: #111;">`,
                `<p>Feedback type: ${type}</p>`,
                `<p>Comment: ${comment}</p>`,
                screenshot ? `<image src=${screenshot} />` : null,
                `</div>`
            ].join("\n")
        });

    }

}