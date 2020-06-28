import { isEmpty } from 'lodash';
import {isSchema } from '@hapi/joi';

import APIError from '../utils/APIError';
import { handler } from './error';



export default function(schema) {
  function validate(entry, schema, key) {
    if (isSchema(schema)) {
      const { error } = schema.validate(entry);
      if (!error) return {};

      return {
        [key]: `${error.details[0].type.toUpperCase().replace('.', '_')}`,
      };
    }

    let result = {};
    const keys = Object.keys(schema);
    keys.forEach(key => {
      result = { ...result, ...validate(entry ? entry[key] : null, schema[key], key) };
    });

    return result;
  }

  return (req, res, next)=> {
    const errors = validate(req, schema);

    if (isEmpty(errors)) return next();
    const inputErrors = new APIError({
      errors,
      status: 'BAD_REQUEST',
      statusMessage: 'INVALID_REQUEST',
    });

    return handler(inputErrors, res);
  };
}
