import express from 'express';
import * as controller from '../controllers/subcategory.controller';
import validate from '../middlewares/validation';
import { listsubcategories,createsubcategory } from '../validations/subcategory.validation';
import { list } from '../utils/helpers';

const router = express.Router();
router.route('/get/:id').get(validate(listsubcategories),controller.get);
router.route('/listPerCat/:id').get(validate(listsubcategories),controller.listpercat)
router.route('/list').get(validate(listsubcategories),controller.list);
router.route('/create').post(validate(createsubcategory), controller.add);
router.route('/delete/:id').delete(controller.remove);
router.route('/update/:id').patch(controller.update);
export default router;