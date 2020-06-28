import httpStatus from 'http-status';

import { handler } from '../middlewares/error';


class ApiResponse {
  constructor(response) {
    this.response = response;
    this.base = this.base.bind(this);
  }

  response = null;

  request = null;

  async base(resolve, reject, status)  {
    try {
      this.response.status(httpStatus[status]);
      const resolved = await resolve(this.request);
      const response= {
        status: 'OK',
      };
      if (resolve !== null || resolve !== undefined) {
        response.data = resolved;
      }

      this.response.json(response);
    } catch (e) {
      console.log(e);
      const error = await reject(e);
      handler(error, this.response);
      
    }
  }

  success = async (resolve, reject = (e) => e || 'INTERNAL_SERVER_ERROR') => {
    await this.base(resolve, reject, 'OK');
  };

  create = async (resolve, reject = (e) => e || 'INTERNAL_SERVER_ERROR') => {
    await this.base(resolve, reject, 'CREATED');
  };
}

export default ApiResponse;
