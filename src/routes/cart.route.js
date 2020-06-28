import express from 'express';
import * as controller from '../controllers/cart.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import validate from '../middlewares/validation';
// import { createreview } from '../validations/review.validation';
const router = express.Router();

router.route('/').post(authorize(LOGGED_USER),controller.add);

export default router;