import express from 'express';
import { getStudentsByGroup, getTeacherByGroup, getAllGroups } from '../controllers/groupController.js';

const router = express.Router();

router.get('/:id/students', getStudentsByGroup);
router.get('/:id/teacher', getTeacherByGroup);
router.get('/all', getAllGroups);

export { router as groupRoutes };
