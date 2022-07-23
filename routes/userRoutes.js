/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import express from 'express';
import { register } from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(register);

export default router;
