import express from 'express';
import * as controller from '../controllers/product.controller'
import validate from '../middlewares/validation';
import { listProducts, createProduct, updateProduct } from '../validations/product.validation'

const router = express.Router();
router.route('/listPerCat/:id').get(validate(listProducts), controller.listpercat);
router.route('/listPerSubCat/:id').get(validate(listProducts), controller.listpersubcat);
router.route('/list').get(validate(listProducts), controller.list);
router.route('/listdesc').get(validate(listProducts), controller.listdesc);
router.route('/listasc').get(validate(listProducts), controller.listasc);
router.route('/list/:id').get(controller.get);
router.route('/create').post(validate(createProduct), controller.add);
router.route('update/:id').patch(validate(updateProduct), controller.update)
router.route('/delete/:id').delete(controller.remove);

export default router;