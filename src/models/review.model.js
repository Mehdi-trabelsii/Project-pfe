import mongoose from 'mongoose';
import { list, get } from '../utils/helpers'

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    postedOn: Date,
    rating: {
        type: Number,
        min: [1],
        max: [5]
    },
    review: String,
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    reports:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        type:{
            type: String,
            enum: [' langage injurieux', 'Critique impartiale', 'Spam','Publicité']
        },
    }]
},
);
reviewSchema.pre('save', function (next) {
    Math.round(this.rating);
    next();
});
reviewSchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'product', 'postedOn', 'rating', 'review', 'user', 'replies', 'usern','reports'];

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },

})
reviewSchema.statics = {
    get,
    list,
}
var Review = mongoose.model('Review', reviewSchema);
export default Review;