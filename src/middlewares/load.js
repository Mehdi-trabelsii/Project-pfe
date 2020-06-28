

import { handler } from '../middlewares/error';

export default function load(model, name) {
  return async function(req, res, next, id) {
    try {
      const doc = await (model).get(id);
      if (!req.locals) (req.locals) = {};
      req.locals[name] = doc;
      return next();
    } catch (error) {
      return handler(error, res);
    }
  };
}
