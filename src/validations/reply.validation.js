import Joi from '@hapi/joi';
export const createreply = {
    body: {
        reply: Joi.string()
            .required()
            .min(6)
            .max(128),
    }

}