
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';

import { omit } from 'lodash';

import User from '../models/user.model';
import hashPassword from '../utils/bcrypt';

import ApiResponse from '../utils/APIResponse';


export function get(req, res) {
    return new ApiResponse(res).success(() => {
      return req.locals.user.transform();
    });
  }

  export function loggedIn(req, res) {
    return new ApiResponse(res).success(
      () => {
        return req.locals.user.transform();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  export async function create(req, res, next) {
    return new ApiResponse(res).create(
      async () => {
        const user = new User(req.body);
        const savedUser = await user.save();
        return savedUser.transform();
      },
      (error) => {
        next(User.checkDuplicateEmail(error));
      },
    );
  }

  export function replace(req, res, next) {
    new ApiResponse(res).success(
      async () => {
        const { user } = req.locals;
        const newUser = new User(req.body);
        const ommitRole = user.role !== 'admin' ? 'role' : '';
        const newUserObject = omit(newUser.toObject(), '_id', ommitRole);
  
        await user.update(newUserObject, { override: true, upsert: true });
        const savedUser = await User.findById(user._id);
        return savedUser.transform();
      },
      (error) => {
        next(User.checkDuplicateEmail(error));
      },
    );
  }

  export function update(req, res, next) {
    new ApiResponse(res).success(
      async () => {
        const { user } = req.locals;
        const { body } = req;
        if (body.password) {
          const oldHashedPassword = body.OldPassword;
          const existingHashedPassword = user.password;
          if (user) {
            const comparePasswords = await bcrypt.compare(oldHashedPassword, existingHashedPassword);
            if (!comparePasswords) {
              User.errorPassword();
            }
          }
          user.password = await hashPassword(body.password);
        }
        const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
        const updatedUser = omit(req.body, ommitRole);
        const NewUser = Object.assign(req.locals.user, updatedUser);
        const savedUser = await NewUser.save();
        return savedUser.transform();
      },
      (error) => next(User.checkDuplicateEmail(error)),
    );
  }

  export function list(req, res, next) {
    return new ApiResponse(res).success(
      async () => {
        const users = await User.list(req.query);
        const transformedUsers = users.map(user => user.transform());
        return transformedUsers;
      },
      (error) => next(error),
    );
  }
  export function remove(req, res, next) {
    const { user } = req.locals;
    user
      .remove()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch(e => next(e));
  }
  
  
  
  
  
  
  
  