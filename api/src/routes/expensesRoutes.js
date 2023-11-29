import express from 'express';
import { getSchoolExpenses } from '../controllers/expensesController.js';

const router = express.Router();

router.get('/expenses', getSchoolExpenses);

export { router as expensesRoutes };
