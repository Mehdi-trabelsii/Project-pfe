import express from 'express';
import * as controller from '../controllers/product.controller'
import * as controllerpop from '../controllers/popular.controller';
import validate from '../middlewares/validation';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import { listProducts, createProduct, updateProduct } from '../validations/product.validation'

const router = express.Router();
router.route('/listPerCat/:id').get(validate(listProducts), controller.listpercat);
router.route('/listPerSubCat/:id').get(validate(listProducts), controller.listpersubcat);
router.route('/list').get(validate(listProducts), controller.list);
router.route('/listdesc').get(validate(listProducts), controller.listdesc);
router.route('/listasc').get(validate(listProducts), controller.listasc);
router.route('/search').get(controller.search);
router.route('/list/:id').get(authorize(LOGGED_USER,{redirect:false}),controller.get);
router.route('/create').post(validate(createProduct), controller.add);
router.route('update/:id').patch(validate(updateProduct), controller.update)
router.route('/delete/:id').delete(controller.remove);
router.route('/listpopulars').get(validate(listProducts),controllerpop.list);

export default router;