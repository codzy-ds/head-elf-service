import express from 'express';
import {getPersonalities} from '../controllers/personality';

const router = express.Router();

router.route('/')
  .get(getPersonalities)

export default router
