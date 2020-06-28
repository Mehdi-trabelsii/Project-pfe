import express from 'express';
import * as controller from '../controllers/user.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import validate from '../middlewares/validation';
import load from '../middlewares/load';
import User from '../models/user.model';

import { createUser, listUsers, replaceUser, updateUser } from '../validations/user.validation';

const router = express.Router();


router.param('userId', load(User, 'user'));

router
  .route('/')

  .get(authorize('admin'), validate(listUsers), controller.list)

  .post(authorize('admin'), validate(createUser), controller.create);

  router
  .route('/profile')
  .get(authorize(LOGGED_USER), controller.loggedIn);

  router
  .route('/:userId')
  .get(authorize(LOGGED_USER), controller.get)

  .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)
  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)
  .delete(authorize(LOGGED_USER), controller.remove);

  export default router;

