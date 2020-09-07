import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
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
        }],
    },

);
favoriteSchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'user', 'products'];

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },


})

const favorite = mongoose.model('Favorite', favoriteSchema);
export default favorite;

