import ApiResponse from '../utils/APIResponse';
import Favorite from '../models/favorite.model';
import APIError from '../utils/APIError';
export function get(req, res) {
    return new ApiResponse(res).success(async () => {
        const { user } = req.locals;
        let favorite = await Favorite.findOne({ user: user._id }).populate('products.product');
        console.log(favorite)
        return favorite.transform();
    });
}
export async function add(req, res, next) {
    return new ApiResponse(res).create(async () => {
        const { user } = req.locals;
        let favorite = await Favorite.findOne({ user: user._id })
        if (!favorite) {
            favorite = await new Favorite({ user: user._id, products: req.body.products }).save()
           
            await favorite.update();
            return favorite
        }
        let { products } = req.body
        const isExist = products.find(product =>
            favorite.products.find((favoriteProduct) => {
                return product.product.toString() === favoriteProduct.product.toString()
            })
        )
        if (isExist) {
            throw new APIError({
                status: 'BAD_REQUEST',
                statusMessage: 'INVALID_REQUEST',
                errorCode: 'product already exists',
            })
        }
        if (favorite.products) {
            products = [...favorite.products, ...products]
        }
        console.log(favorite._id);
        await favorite.update({ products })
        return await Favorite.findById(favorite._id)
    })
}
export function deleteprod(req, res, next) {
    return new ApiResponse(res).success(
    )
}
export function update(req, res, next) {
    new ApiResponse(res).success(
        async () => {
            const { user } = req.locals;
            const updatedfavorite = await Favorite.findOneAndUpdate({ user: user._id }, req.body, { new: true });
            return updatedfavorite.transform();
        },
    );
}