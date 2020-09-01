import express from 'express';
import * as controller from '../controllers/recommanded.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import validate from '../middlewares/validation';

const router = express.Router();

router.route('/list/').get(authorize(LOGGED_USER),controller.list);

export default router;