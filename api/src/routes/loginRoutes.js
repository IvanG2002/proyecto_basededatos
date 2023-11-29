import express from 'express';
import { loginUser, createUser } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', loginUser);

router.post('/create', createUser);


export { router as loginRoutes };
