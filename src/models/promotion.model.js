import mongoose from 'mongoose';
import { list, get } from '../utils/helpers';
const promotionSchema = new mongoose.Schema(
    {
        datestart:{
            type:Date,
            required:true,
        },
        datefin :{
            type:Date,
            required:true,
        },
        reduction:{
            type:Number,
            required:true,
        },

    }
);
promotionSchema.method({
    transform() {
      const transformed= {};
      const fields = ['_id', 'datestart', 'datefin', 'reduction'];
  
      fields.forEach((field) => {
        (transformed )[field] = this[field];
      });
  
      return transformed;
    },
    
})
promotionSchema.statics={
    get,
    list,
}

const promotion = mongoose.model('Promotion', promotionSchema);
export default promotion;