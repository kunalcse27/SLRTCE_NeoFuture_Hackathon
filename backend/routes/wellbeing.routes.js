import express from 'express';
import { getWellbeingStats, submitJournalEntry } from '../controllers/wellbeingController.js';

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

export default router;
