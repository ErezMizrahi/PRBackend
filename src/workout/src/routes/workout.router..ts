import { Router } from 'express';
import { createWorkout } from '../controllers/workout.controller.js';

const router = Router();

router.post('/create', createWorkout);

export default router;