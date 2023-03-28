import { Router } from 'express';
const router = Router();
import { registerUser, loginUser, verify } from '../controllers/user.controller.js'

router.post('/login',loginUser)
router.post('/signup',registerUser)
router.post('/',verify)


export default router;