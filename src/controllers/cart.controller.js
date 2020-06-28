import ApiResponse from '../utils/APIResponse';
import httpStatus from 'http-status';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import cart from '../models/cart.model';
import APIError from '../utils/APIError';


export async function add(req, res, next) {

    return new ApiResponse(res).create(async () => {
        const { user } = req.locals;

        let cart = await Cart.findOne({ user: user._id })
        if (!cart) {
            cart = await new Cart({ user: user._id, products: req.body.products }).save()
            return cart

        }


        let { products } = req.body
        const isExist = products.find(product =>
            cart.products.find((cartProduct) =>{
                console.log(cartProduct)
                console.log(product)
                return product.product.toString() === cartProduct.product.toString() } )
        )

        if (isExist) {
            throw new APIError({
                status: 'BAD_REQUEST',
                statusMessage: 'INVALID_REQUEST', 
                errorCode: 'product already exists',
            })
        }
        if (cart.products) {
            products = [...cart.products, ...products]
        }
        console.log(cart._id);
        await cart.update({ products })
        return await Cart.findById(cart._id)
    })
}