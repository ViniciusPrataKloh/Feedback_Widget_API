import express from 'express';
import { CreateFeedbackController } from './controllers/create-feedback.controller';

export const router = express.Router();

const createFeedbackController = new CreateFeedbackController();


router.post("/feedback", createFeedbackController.handle);