import express from 'express';
import { getAllTeachers, getSubjectsByTeacher } from '../controllers/teacherController.js';

const router = express.Router();

router.get('/all', getAllTeachers);
router.get('/:id/subjects', getSubjectsByTeacher);

export { router as teacherRoutes };
