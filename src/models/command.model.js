import mongoose, { Model, Document } from 'mongoose';
const commandSchema = new mongoose.Schema(
    {
        adresseCmd:{
            type:String,
            required:true,
            lowercase:true,
            minlength:4,
        },
        datecmd:{
            type:Date,
            required:true,
            
        }
    }
);
const command = mongoose.model('Command',commandSchema);
export default command;