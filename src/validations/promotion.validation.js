import Joi from '@hapi/joi';

// GET /v1/promos
export const listPromos = {
    body: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      datestart: Joi.date(),
      datefin: Joi.date(),
      reduction: Joi.number(),
    },
  };

//Post /v1/promos/createpromo

export const createPromos= {
    body: {
        datestart: Joi.date()
        .required(),
        datefin: Joi.date()
        .required(),
        reduction: Joi.number().required(),
    },
  };

