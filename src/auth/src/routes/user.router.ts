import { Router } from 'express';
const router = Router();
import { registerUser, loginUser } from '../controllers/user.controller.js'

router.post('/login',loginUser)
router.post('/signup',registerUser)


export default router;