import { Router } from 'express';
import { createWorkout, createExercise } from '../controllers/workout.controller.js';
import { authGuard } from '../middleware/auth.js';

const router = Router();

router.post('/create', authGuard, createWorkout);
router.post('/exersice', createExercise);


export default router;