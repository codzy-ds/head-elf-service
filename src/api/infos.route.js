import express from 'express';
import {getInfos} from '../controllers/infos';

const router = express.Router();

router.route('/')
  .get(getInfos)

export default router
