import Joi from '@hapi/joi';

// GET /v1/products
export const listProducts = {
    body: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      label: Joi.string(),
      price: Joi.number(),
      images: Joi.array(),
      promotion : Joi.string(),
    },
  };

export const updateProduct = {
    body: {
      label: Joi.string().
      required(),
      price: Joi.number().
      required(),
      images: Joi.array().
      required(),
      quantity : Joi.number().
      required(),
      credit : Joi.number().
      required(),
      description :Joi.string()
      .min(28)
      .max(400), 
    }
  };
  //POST /v1/procuts/createproduct
  export const createProduct= {
    body: {
      label: Joi.string()
        .required(),
        price: Joi.number()
        .required(),
        quantity: Joi.number().required(),
        credit:Joi.number().required(),
        description:Joi.string().required()
        .max(400),
        images:Joi.array().required(),
        marque:Joi.string().required(),
        category : Joi.string().required(),
        promotion: Joi.string().required()
    },
  };