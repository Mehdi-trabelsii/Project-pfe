import mongoose from 'mongoose';
import { list, get } from '../utils/helpers';
const characteristicSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
        },
    }
);
charactersticSchema.method({
    transform() {
        const transformed = {};
        const fields = ['_id', 'label'];

        fields.forEach((field) => {
            (transformed)[field] = this[field];
        });

        return transformed;
    },
})

charactersticSchema.statics = {
    checkDuplicateLabel(error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return new APIError({
                status: 'CONFLICT',
                errorCode: 'CHARACTERSTIQUE_ALREADY_EXIST',
                statusMessage: 'INVALID_REQUEST',
            });
        }
        return error;
    },
    get,
    list,
}
const characteristic = mongoose.model('Characteristic', characteristicSchema);
export default characteristic;