import express from 'express';
import {getTricks, getRandomTrick, createTrick, getTrickById} from '../controllers/tricks';

const router = express.Router();

router.route('/')
  .get(getTricks)
  .post(createTrick)

router.route('/:trickId')
       .get(getTrickById)

router.route('/random')
      .get(getRandomTrick)

export default router
