import mongoose, { Model, Document } from 'mongoose';
import APIError from '../utils/APIError';
import { list, get } from '../utils/helpers';
import { isNil, omitBy } from 'lodash';
import category from './category.model';
const productSchema = new mongoose.Schema(

    {
        label: {
            type: String,
            required: true,
            lowercase: true,
            maxlength: 128,
            unique: true
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        credit: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
            maxlength: 400,
        },
        images: [{
            type: String,
            required: true,
        }],
        marque: {
            type: String,
            required: true,
            maxlength: 128,
        },
        promotion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Promotion',
        },
        // model:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Model'
        // },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required: true,
        },
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory'
        },
        reviews: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Review'
          }]
    },



);

productSchema.virtual('overallRating').get(function() {
    var ratingsTotal = 0;
    var result = 0;
    if (this.reviews) {
      for (var i = 0; i < this.reviews.length; i++) {
        ratingsTotal += this.reviews[i].rating;
      }
      result = Math.round(ratingsTotal / this.reviews.length);
    }
    return result;
  });
productSchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'label', 'price', 'quantity', 'credit', 'description', 'images', 'marque', 'subcategory', 'promotion','category','reviews'];

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },

})
productSchema.statics = {
    checkDuplicateLabel(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return new APIError({
                status: 'CONFLICT',
                errorCode: 'PRODUCT_ALREADY_EXIST',
                statusMessage: 'INVALID_REQUEST',
            });
        }
        return error;
    },
    get,
    async list({ page = 1, perPage = 30, ...rest }) {
        const options = omitBy(rest, isNil);
        console.log(options.promotion);
        if (options.promotion) {
            options.promotion = { $exists: true ,$nin: null }
        }

        return this.find(options)
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage)
            .populate("promotion")
            .exec();
    }
}
const product = mongoose.model('Product', productSchema);
export default product;
