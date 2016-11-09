import express from 'express';
import {getTricks, getRandomTrick} from '../controllers/tricks';

const router = express.Router();

router.route('/')
  .get(getTricks)

router.route('/random')
      .get(getRandomTrick)

export default router
