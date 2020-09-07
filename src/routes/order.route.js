import express from 'express';
import * as controller from '../controllers/order.controller';
import { authorize, LOGGED_USER,ADMIN } from '../middlewares/auth';
import validation from '../middlewares/validation';
const router = express.Router();

router.route('/create').post(authorize(LOGGED_USER), controller.create);
router.route('/list/:id').get(controller.get)
router.route('/list').get(controller.list)
router.route('/update/:id').patch(authorize(LOGGED_USER),controller.update);

export default router;