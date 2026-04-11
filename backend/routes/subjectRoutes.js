import express from 'express';
import { createSubject, deleteSubject, getSubjects } from '../controllers/subjectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getSubjects);
router.post('/', protect, createSubject);
router.delete('/:id', protect, deleteSubject);

export default router;
