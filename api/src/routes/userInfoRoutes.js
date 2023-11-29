import express from 'express';
import { getInfoByUsername } from '../controllers/userInfoController.js';

const router = express.Router();

router.post('/', getInfoByUsername);

export { router as infoRoutes };
