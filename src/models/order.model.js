import mongoose, { Model, Document, mongo } from 'mongoose';
import { list, get } from '../utils/helpers';
import cart from './cart.model';
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
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
        const fields = ['_id', 'user', 'cart', 'adresse', 'date', 'status'];

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