import express from 'express';
import {getTags} from '../controllers/tags';

const router = express.Router();

router.route('/')
  .get(getTags)

export default router
