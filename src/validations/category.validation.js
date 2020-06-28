import Joi from '@hapi/joi';

// POST /v1/categories/createcategory
export const createcategory = {
    body: {
      label: Joi.string()
        .required()
        .max(128),
      image: Joi.string().required(),
      icon: Joi.string().required()
    },
  };
//GET /v1/categories/listcategories

export const listcategories ={
    body: {
        page: Joi.number().min(1),
        perPage: Joi.number()
          .min(1)
          .max(100),
        label: Joi.string(),
        image: Joi.string(),
      },
}


