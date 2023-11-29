import express from 'express';
import { getTopStudents } from '../controllers/schoolTopController.js';

const router = express.Router();

router.get('/students', getTopStudents);


export { router as schoolTopRoutes };

