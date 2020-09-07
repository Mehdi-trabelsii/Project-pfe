import Order from '../models/order.model';
import Cart from '../models/cart.model';
import ApiResponse from '../utils/APIResponse';
import httpStatus from 'http-status';
import { transform } from 'lodash';



export function get(req, res) {
    return new ApiResponse(res).success(() => {
        const orders = Order.findById(req.params.id).populate('user').populate('cart.products');
        const transformedOrder = orders.map(orders => {
            let order = orders.transform();
    
            return order;
          });;
        console.log(transformedOrder)
        return transformedOrder;
    });
}

export function list(req, res, next) {
    return new ApiResponse(res).success(
        async () => {

            const orders = await Order.find(req.query).populate('user').populate('cart.products');
            console.log(orders);
            const transformedOrders = orders.map(order => order.transform());
            return transformedOrders;
        },
        (error) => next(error),
    );
}

export function create(req, res, next) {
    return new ApiResponse(res).success(
        async () => {
            const { user } = req.locals;
            let cart = await Cart.findOne({ user: user._id })
            var order = new Order({
                products: cart.products,
                date: Date.now(),
                adresse: req.body.adresse,
                user: user._id
            });
            await cart.update({ products: [] })
            console.log(cart)
            await order.save()
            return order;
        }
    )
}
export function update(req, res, next) {
    return new ApiResponse(res).success(
        async () => {
            const updatedorder = await Order.findByIdAndUpdate(req.params.id, omit(req.body), { new: true });
            return (await updatedorder).transform();
        },
    );
}
