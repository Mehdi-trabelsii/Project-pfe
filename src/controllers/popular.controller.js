import Popular from '../models/popular.model';
import ApiResponse from '../utils/APIResponse';
import { omit, fromPairs } from 'lodash';
  export function list(req, res, next) {
    return new ApiResponse(res).success(
      async () => {
        const populars = await Popular.list(req.query);
        const transformedPopulars = populars.map(popular => popular.transform());
        return transformedPopulars;
      },
      (error) => next(error),
    );
  }