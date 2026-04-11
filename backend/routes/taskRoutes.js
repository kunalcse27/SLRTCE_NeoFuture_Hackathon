import express from 'express';
import { createTask, deleteTask, getTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.delete('/:id', protect, deleteTask);

export default router;
