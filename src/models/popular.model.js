import mongoose from 'mongoose';
import { isNil, omitBy } from 'lodash';

const popularshcema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },

        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
        popularity: {
            type: Number,
            default: 0
        }
    }
)

popularshcema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'product', 'users', 'popularity']

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },

})
popularshcema.statics={
    async list({ page = 1, perPage = 30, ...rest }) {
        const options = omitBy(rest, isNil);
        console.log(options.product);
        return this.find(options)
            .sort({ popularity: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .populate("product")
            .exec();
    },
}
const popular = mongoose.model('Popular', popularshcema);
export default popular;
