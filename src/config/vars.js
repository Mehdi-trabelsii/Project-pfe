import dotEnv from 'dotenv-safe';

dotEnv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const jwtSecret = process.env.JWT_SECRET;
export const baseUrlImage = process.env.BASE_URL_IMAGE;
export const jwtExpirationInterval = process.env.JWT_EXPIRATION_MINUTES;
export const mongo = {
  uri: process.env.MONGO_URI,
};
export const serverUrl = process.env.NODE_ENV === 'test' ? process.env.SERVER_URL_TESTS : process.env.SERVER_URL;
export const baseUrlFront = process.env.FRONT_URL;
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
