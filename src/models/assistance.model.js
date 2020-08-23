import mongoose from 'mongoose';
import { list, get } from '../utils/helpers';

const assistanceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'

        },
        type: {
            type: String,
            enum: ['Assistance technique', 'Assistance commercial', 'Autre'],
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['résolue', 'en cours'],
            default: 'en cours'
        }

    });
assistanceSchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'user', 'type', 'text', 'status'];
        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });
        return transformed;
    }
}
)
assistanceSchema.statics = {
    get,
    list,
}

const Assistance = mongoose.model('Assistance', assistanceSchema);
export default Assistance;
