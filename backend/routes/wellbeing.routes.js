import express from 'express';
import {
    getWellbeingStats,
    submitJournalEntry,
    chatWithMira,
    analyzeSentiment
} from '../controllers/wellbeingController.js';

const router = express.Router();

/**
 * @route GET /api/wellbeing/stats
 * @desc Get current wellbeing statistics and trends
 */
router.get('/stats', getWellbeingStats);

/**
 * @route POST /api/wellbeing/journal
 * @desc Submit a new mental health journal entry
 */
router.post('/journal', submitJournalEntry);

/**
 * @route POST /api/wellbeing/chat
 * @desc AI Chatbot for mental health support
 */
router.post('/chat', chatWithMira);

/**
 * @route POST /api/wellbeing/analyze
 * @desc Automated sentiment and stress analysis
 */
router.post('/analyze', analyzeSentiment);

export default router;
