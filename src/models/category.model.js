import mongoose from 'mongoose';
import { list, get } from '../utils/helpers'
const categorySchema =new mongoose.Schema(
    {
        label:
        {
        type:String,
        required:true,
        maxlength:128,
        trim:true,
        unique:true,
        },
        image:{
            type:String,
            required:true,
            trim:true
        },
        icon:{
          type:String,
          required:true,
          trim:true,
        }

    }
);
categorySchema.method({
    transform() {
      const transformed= {};
      const fields = ['_id', 'label', 'icon','image'];
  
      fields.forEach((field) => {
        (transformed )[field] = this[field];
      });
  
      return transformed;
    },
    
})
categorySchema.statics={
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
      list,
    }
const category = mongoose.model('Category',categorySchema);
export default category;