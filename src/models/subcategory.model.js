import mongoose from 'mongoose';
import { list, get } from '../utils/helpers'
import category from './category.model';
const subcategorySchema =new mongoose.Schema(
    {
        label:
        {
        type:String,
        required:true,
        maxlength:128,
        trim:true,
        unique:true,
        },
        characteristics:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Characteristic'
        }],
        image:{
            type:String,
            required:true,
            trim:true
        },
        icon:{
          type:String,
          required:true,
          trim:true
        },
        category:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Category'
        }

    }
);
subcategorySchema.method({
    transform() {
      const transformed= {};
      const fields = ['_id', 'label', 'characteristics','image','icon','category'];
  
      fields.forEach((field) => {
        (transformed )[field] = this[field];
      });
  
      return transformed;
    },
    
})
subcategorySchema.statics={
    checkDuplicateLabel(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
          return new APIError({
            status: 'CONFLICT',
            errorCode: 'SUBCATEGORY_ALREADY_EXIST',
            statusMessage: 'INVALID_REQUEST',
          });
        }
        return error;
      },
      get,
      list,
    }
const subcategory = mongoose.model('Subcategory',subcategorySchema);
export default subcategory;