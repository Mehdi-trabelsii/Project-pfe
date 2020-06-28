import passport from 'passport';

import APIError from '../utils/APIError';

import { handler as localHander } from './error';
export const ADMIN = 'admin';
export const LOGGED_USER = 'user';
function handleJWT(req, res, next, role, options) {
  return async (err,user,info) => {
    const error = err || info;
    let handler = localHander;
    if (!options.redirect) {
      handler = () => {};
    }
    const apiError = new APIError({
      errorCode: error
        ? error.message
            .split(' ')
            .join('_')
            .toUpperCase()
        : 'Unauthorized',
      status: 'UNAUTHORIZED',
      statusMessage: 'REQUEST_DENIED',
    });
    try {
      if (error || !user) throw error;
      await req.logIn(user, { session: false }, err => {
        if (err) {
          handler(
            new APIError({
              errorCode: 'INTERNAL_SERVER_ERROR',
              status: 'INTERNAL_SERVER_ERROR',
              statusMessage: 'UNKNOWN_ERROR',
            }),
            res,
          );
        }
      });
    } catch (e) {
      handler(apiError, res);
    }
    if (!role.includes(user.role)) {
      apiError.status = 'FORBIDDEN';
      apiError.errorCode = 'FORBIDDEN';
      handler(apiError, res);
    }
    if (err || !user) {
      handler(apiError, res);
    }

    if (!(req).locals) {
      (req).locals = {};
    }
    (req).locals.user = user;
    return next();
  };
}
export function authorize(role, options) {
  const o = options || {};
  if (o.redirect === undefined) {
    o.redirect = true;
  }
  return (req, res, next) =>
    passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, role, o))(req, res, next);
}
export function oAuth(service) {
  return passport.authenticate(service, { session: false });
}
