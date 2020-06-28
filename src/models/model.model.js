import mongoose, { Model, Document } from 'mongoose';
const modelSchema = new mongoose.Schema(
    {
        label :{
            type:String,
            required:true,
            unique:true,
            maxlength:128,
        },
    }
);
const model = mongoose.model('Model', modelSchema);
export default model;