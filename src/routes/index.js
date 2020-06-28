import express from 'express';

import authRoutes from './auth.route';
import userRoutes from './user.route';
import productRoutes from './product.route'
import promotionRoutes from'./promotion.route'
import categoryRoutes from './category.route'
import subcategoryRoutes from './subcategory.route';
import reviewRoutes from'./review.route';
import replyRoutes from'./reply.route';
import cartRoutes from'./cart.route';
import uploadIcon from '../utils/helpers';
import path from 'path';
import {uploadcontroller} from '../controllers/upload.controller';



const router = express.Router();
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));
router.use('/promos',promotionRoutes);
router.use('/products',productRoutes);
router.use('/reviews',reviewRoutes);
router.use('/replies',replyRoutes);
router.use('/cart',cartRoutes);
router.use('/categories',categoryRoutes);
router.use('/subcategories',subcategoryRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.post('/upload',uploadIcon.single("image"),uploadcontroller);

router.use('/images',express.static(path.join(__dirname,"../../public")))



export default router;