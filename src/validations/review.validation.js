import Joi from '@hapi/joi';
export const createreview ={
    body:{
        rating: Joi.number()
        .min(1)
        .max(5)
        .required(),
      review: Joi.string()
        .required()
        .min(6)
        .max(128),
    }

}