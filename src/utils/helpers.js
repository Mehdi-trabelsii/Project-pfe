import { isNil, omitBy } from 'lodash';
import { Model, Document, Types } from 'mongoose';
import ApiError from './APIError';
import multer from 'multer';
import path from 'path';

export function list({ page = 1, perPage = 30, ...rest }) {
  const options = omitBy(rest, isNil);

  return this.find(options)
    .sort({ createdAt: -1 })
    .skip(perPage * (page - 1))
    .limit(perPage)
    .exec();
}

export async function get(id) {
  try {
    let doc;

    if (Types.ObjectId.isValid(id)) {
      doc = await this.findById(id).exec();
    }
    if (doc) {
      return doc;
    }

    throw new ApiError({
      errorCode: 'USER_NOT_FOUND',
      status: 'NOT_FOUND',
      statusMessage: 'INVALID_REQUEST',
    });
  } catch (error) {
    throw error;
  }
}
export function imageFilter(file) {
  // Accept images only
  if (!file.originalname.match(/\.(SVG|svg|png|PNG)$/)) {
    return 'Only image files are allowed!';
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fullPath = path.join(__dirname, '../../public');
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadIcon = multer({ storage });

export default uploadIcon;
