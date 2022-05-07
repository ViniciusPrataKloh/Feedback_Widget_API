import { prisma } from "../../prisma";
import { FeedbackCreateDTO, FeedbackRepository } from "../interfaces/feedbacks.repository.interface";


export class PrismaFeedbacksRepository implements FeedbackRepository {
    async create({ type, comment, screenshot }: FeedbackCreateDTO): Promise<void> {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });
    };

}