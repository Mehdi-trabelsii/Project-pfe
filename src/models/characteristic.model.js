import mongoose, { Model, Document } from 'mongoose';

const characteristicSchema = new mongoose.Schema(
    {
        label:{
            type:String,
            required:true,
        },
    }
);
const characteristic = mongoose.model('Characteristic',characteristicSchema);
export default characteristic;