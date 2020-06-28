import bcrypt from 'bcryptjs';
import { jwtExpirationInterval, jwtSecret } from '../config/vars';
import jwt from 'jwt-simple';
import hash from '../utils/bcrypt';
import moment from 'moment-timezone';
import mongoose, { Model, Document } from 'mongoose';
import APIError from '../utils/APIError';
import { list, get } from '../utils/helpers';


export const roles = ['user', 'admin'];
   

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        minlength: 6,
        maxlength: 128,
      },
      firstName: {
        type: String,
        maxlength: 128,
        index: true,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
      },
      role: {
        type: String,
        enum: roles,
        default: 'user',
      },
    },
    {
      timestamps: true,
    },
  );

  userSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) return next();
      this.password = await hash(this.password);
      next();
    } catch (e) {
      return next(e);
    }
  });

  userSchema.pre('update', async function(next) {
    try {
      const { password } = this.getUpdate();
      if (!password) return next();
      this.getUpdate().password = await hash(password);
    } catch (e) {
      next(e);
    }
  });

  userSchema.method({
    transform() {
      const transformed= {};
      const fields = ['_id', 'firstName', 'lastName', 'email', 'active', 'role', 'structure'];
  
      fields.forEach((field) => {
        (transformed )[field] = this[field];
      });
  
      return transformed;
    },
  
    token() {
      const payload = {
        exp: moment()
          .add(jwtExpirationInterval, 'minutes')
          .unix(),
        iat: moment().unix(),
        sub: this._id,
      };
      return jwt.encode(payload, jwtSecret);
    },
  
    passwordMatches(password) {
      return bcrypt.compare(password, this.password);
    },
  });

  userSchema.statics = {
  roles,
  get,
  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email) {
      throw new APIError({
        errorCode: 'USER_INVALID_EMAIL',
        status: 'BAD_REQUEST',
        statusMessage: 'INVALID_REQUEST',
      });
    }

    const user = await this.findOne({ email }).exec();
    const err = {
      status: 'UNAUTHORIZED',
      errorCode: '',
      statusMessage: 'INVALID_REQUEST',
    };
    if (password) {
        if (user  && (await user.passwordMatches(password))) {
          return { user, accessToken: user.token() };
        }
        err.errorCode = 'USER_WRONG_EMAIL_PASSWORD';
      } else if (refreshObject && refreshObject.userEmail === email) {
        if (moment(refreshObject.expires).isBefore()) {
          err.errorCode = 'USER_WRONG_REFRESH_TOKEN';
        } else {
          return { user, accessToken: user.token() };
        }
      } else {
        err.errorCode = 'USER_WRONG_TOKEN_EMAIL';
      }
      throw new APIError(err);
    },
    async findAdminAndGenerateToken(options) {
      const { email, password, refreshObject } = options;
      if (!email) {
        throw new APIError({
          errorCode: 'USER_INVALID_EMAIL',
          status: 'BAD_REQUEST',
          statusMessage: 'INVALID_REQUEST',
        });
      }

      const user = await this.findOne({ email }).exec();
      const err= {
        status: 'UNAUTHORIZED',
        errorCode: '',
        statusMessage: 'INVALID_REQUEST',
      };
      if (password) {
        if (user && user.role === 'admin' && (await user.passwordMatches(password))) {
          return { user, accessToken: user.token() };
        }
        err.errorCode = 'USER_WRONG_EMAIL_PASSWORD';
      } else if (refreshObject && refreshObject.userEmail === email) {
        if (moment(refreshObject.expires).isBefore()) {
          err.errorCode = 'ADMIN_WRONG_REFRESH_TOKEN';
        } else {
          return { user, accessToken: user.token() };
        }
      } else {
        err.errorCode = 'USER_WRONG_TOKEN_EMAIL';
      }
      throw new APIError(err);
    },
    list,

  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        status: 'CONFLICT',
        errorCode: 'EMAIL_ALREADY_EXIST',
        statusMessage: 'INVALID_REQUEST',
      });
    }
    return error;
  },
  errorPassword() {
    return new APIError({
      statusMessage: 'INVALID_REQUEST',
      status: 'CONFLICT',
    });
  },
};
const user = mongoose.model('User', userSchema);
export default user;

  
  

  
  
    

