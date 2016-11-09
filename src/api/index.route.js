import express from 'express';
import tricksRoutes from './tricks.route';
import tagsRoutes from './tags.route';
import infoRoutes from './infos.route';
import personalitiesRoutes from './personality.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/tricks', tricksRoutes);
// mount user routes at /users
router.use('/info', infoRoutes);
// mount user routes at /users
router.use('/tags', tagsRoutes);
// mount user routes at /users
router.use('/personalities', personalitiesRoutes);

export default router;
