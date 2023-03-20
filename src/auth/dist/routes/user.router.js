import { Router } from 'express';
const router = Router();
import { createUser } from '../controllers/user.controller.js';
router.get('/login', createUser);
export default router;
//# sourceMappingURL=user.router.js.map