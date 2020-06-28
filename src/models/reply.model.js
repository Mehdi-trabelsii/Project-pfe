import mongoose from 'mongoose';
import { list, get } from '../utils/helpers'

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedOn: Date,
    reply: String,
    likes: Number
},
);
replySchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'postedon', 'reply', 'user'];

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },

}),
    replySchema.statics = {
        get,
        list,
    }
var Reply = mongoose.model('Reply', replySchema);
export default Reply;