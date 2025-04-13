import { Router } from 'express';
import { generatePlan } from '../controllers/aiController.js';

const router = Router();

router.post('/generate-plan/:type', generatePlan);
// router.get('/chat', generateWorkout);

export default router;