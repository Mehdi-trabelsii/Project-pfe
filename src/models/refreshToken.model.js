import mongoose, { Schema, Model, Document } from 'mongoose';
import crypto from 'crypto';
import moment from 'moment-timezone';



const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    ref: 'User',
    required: true,
  },
  expires: { type: Date },
});

refreshTokenSchema.statics = {
  async generate(user) {
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment()
      .add(30, 'days')
      .toDate();
    const tokenObject = new this({
      token,
      userId,
      userEmail,
      expires,
    });
    await tokenObject.save();
    return tokenObject;
  },
};

const RefreshToken = mongoose.model(
  'RefreshToken',
  refreshTokenSchema,
);

export default RefreshToken;
