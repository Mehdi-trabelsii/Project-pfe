import express from 'express';
import * as controller from '../controllers/reply.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import validate from '../middlewares/validation';
import { createreply } from '../validations/reply.validation';
const router = express.Router();

router.route('/review/:id').post(authorize(LOGGED_USER), validate(createreply),controller.add);

export default router;

