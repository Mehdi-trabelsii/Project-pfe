import express from 'express';
import * as controller from '../controllers/favorite.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
// import { createreview } from '../validations/review.validation';
const router = express.Router();
router.route('/').get(authorize(LOGGED_USER), controller.get);
router.route('/').post(authorize(LOGGED_USER), controller.add);
router.route('/').patch(authorize(LOGGED_USER), controller.update);

export default router;