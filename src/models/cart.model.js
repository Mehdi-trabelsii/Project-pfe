import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
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
        total:{
            type:Number,
            default:0,
        }
        
    },

);
cartSchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'user', 'products','total'];

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },
    calcultotal(){
        let result ;
        for (let i =0 ; i <this.products.length ; i++){
            result = result + (this.products[i].product.price * this.products[i].quantity);
             return result;
        }
    }

})

const cart = mongoose.model('Cart', cartSchema);
export default cart;

