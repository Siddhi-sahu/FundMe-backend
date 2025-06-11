import express from 'express';
import { router as UserRouter } from './user.js'
//router instance
const router = express.Router();

router.use('/user', UserRouter);

export {router};