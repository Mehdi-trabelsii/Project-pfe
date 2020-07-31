import mongoose from 'mongoose';

const popularshcema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },

        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }],
        poplarity:{
            type:Number,
            default:0
        }
    }
)

popularshcema.method({
    transform(){
        const transformed = {};
        const fields =['_id','product','users','poplarity']

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },

})
const popular = mongoose.model('Popular',popularshcema);
export default popular;
