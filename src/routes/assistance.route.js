import express from 'express';
import * as controller from '../controllers/assistance.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
const router = express.Router();
router.route('/:id').get(authorize(LOGGED_USER), controller.get);
router.route('/create').post(authorize(LOGGED_USER), controller.add);
router.route('/').get(controller.list);
// router.route('/').patch(authorize(LOGGED_USER), controller.update);

export default router;

