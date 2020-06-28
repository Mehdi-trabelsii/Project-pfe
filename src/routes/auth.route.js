import express from 'express';
import * as controller from '../controllers/auth.controller';
import validate from '../middlewares/validation';
import { login, refresh, register } from '../validations/auth.validation';

const router = express.Router();


router.route('/register').post(validate(register), controller.register);

router.route('/login').post(validate(login), controller.login);

router.route('/refresh-token').post(validate(refresh), controller.refresh);
router.route('/loginAdmin').post(validate(login),controller.loginAdmin);

export default router;