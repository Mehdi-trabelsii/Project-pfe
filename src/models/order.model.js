import mongoose, { Model, Document, mongo } from 'mongoose';
import { list, get } from '../utils/helpers';
import cart from './cart.model';
import { array } from '@hapi/joi';
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: Number,
        }],
        adresse: {
            type: String,
            required: true,
            lowercase: true,
            minlength: 4,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            default: 'not processed',
        }
    }
);
orderSchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'user', 'products', 'adresse', 'date', 'status'];

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },

})
orderSchema.statics = {
    get,
    list,
}

const order = mongoose.model('Order', orderSchema);
export default order;