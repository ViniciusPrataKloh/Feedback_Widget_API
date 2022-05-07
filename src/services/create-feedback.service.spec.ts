import { CreateFeedbackService } from './create-feedback.service';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const createFeedbackService = new CreateFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Create feedback', () => {
    it('should be able to create a new feedback', async () => {

        await expect(createFeedbackService.execute({
            type: 'BUG',
            comment: "Test comment",
            screenshot: 'data:image/png;base64,dasdsadawrsarsdds'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    });

    it('should not be able to create a new feedback without type', async () => {

        await expect(createFeedbackService.execute({
            type: '',
            comment: "Test comment",
            screenshot: 'data:image/png;base64,dasdsadawrsarsdds'
        })).rejects.toThrow();

    });

    it('should not be able to create a new feedback without comment', async () => {

        await expect(createFeedbackService.execute({
            type: 'BUG',
            comment: "",
            screenshot: 'data:image/png;base64,dasdsadawrsarsdds'
        })).rejects.toThrow();

    });

    it('should not be able to create a new feedback with an invalid screenshot format', async () => {

        await expect(createFeedbackService.execute({
            type: 'BUG',
            comment: "Test comment",
            screenshot: 'image.jpg'
        })).rejects.toThrow();

    });
});