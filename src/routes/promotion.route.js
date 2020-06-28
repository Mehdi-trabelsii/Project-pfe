import express from 'express';
import * as controller from '../controllers/pormotion.controller'
import validate from '../middlewares/validation';
import { listPromos,createPromos } from '../validations/promotion.validation';


const router = express.Router();

router.route('/list').get(validate(listPromos),controller.list);
router.route('/create').post(validate(createPromos),controller.add);
router.route('/delete/:id').delete(controller.remove);

export default router;