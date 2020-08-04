import express from 'express';
import * as controller from '../controllers/order.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import validation from '../middlewares/validation';
const router = express.Router();

router.route('/create').post(authorize(LOGGED_USER), controller.create);
router.route('/list/:id').get(controller.get)
router.route('/list').get(authorize(LOGGED_USER), controller.list)


export default router;