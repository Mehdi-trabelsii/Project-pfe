import Order from '../models/order.model';
import Cart from '../models/cart.model';
import ApiResponse from '../utils/APIResponse';


export function get(req, res) {
    return new ApiResponse(res).success(() => {
        const order = Order.findById(req.params.id).populate('products.product');
        console.log(order)
        return order;
    });
}

export function list(req, res, next) {
    return new ApiResponse(res).success(
        async () => {
            const orders = await Order.list(req.query);
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
            var order = new Order({ products: cart.products, date:Date.now(), adresse: req.body.adresse })
            await cart.update({products : []})
            console.log(cart)
            await order.save()
            return order;
        }
    )
}