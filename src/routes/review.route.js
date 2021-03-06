import express from 'express';
import * as controller from '../controllers/review.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import validate from '../middlewares/validation';
import { createreview } from '../validations/review.validation';
const router = express.Router();

router.route('/product/:id').post(authorize(LOGGED_USER), validate(createreview), controller.add);
router.route('/report/:id').patch(authorize(LOGGED_USER),controller.report);
router.route('/list/:id').get(controller.list);
router.route('/delete/:id').delete(authorize(LOGGED_USER), controller.remove)

export default router;

