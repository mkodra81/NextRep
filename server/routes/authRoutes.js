import { Router } from 'express';
import { registerUser, loginUser, verifyEmail } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/:token', verifyEmail);
// router.post('/logout', logoutUser); 

export default router;