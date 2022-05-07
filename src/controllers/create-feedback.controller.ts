import { Request, Response } from "express";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer.mail.adapter";
import { PrismaFeedbacksRepository } from "../repositories/prisma/feedbacks.repository.prisma";
import { CreateFeedbackService } from "../services/create-feedback.service";

export class CreateFeedbackController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { type, comment, screenshot } = req.body;

        const nodemailerMailAdapter = new NodemailerMailAdapter();
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
        const createFeedbackService = new CreateFeedbackService(
            prismaFeedbacksRepository,
            nodemailerMailAdapter
        );

        await createFeedbackService.execute({
            type,
            comment,
            screenshot
        });

        return res.status(201).send();

    }
}