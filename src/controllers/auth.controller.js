import moment from 'moment-timezone';
import { jwtExpirationInterval } from '../config/vars';
import RefreshToken from '../models/refreshToken.model';
import User from '../models/user.model';
import APIError from '../utils/APIError';
import APIResponse from '../utils/APIResponse';

async function generateTokenResponse(user, accessToken) {
    try {
      const tokenType = 'Bearer';
      const generateToken = await RefreshToken.generate(user);
      const refreshToken = generateToken.token;
      const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
      return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
      };
    } catch (e) {
      throw e;
    }
  }
  
  export function register(req, res) {
    async function createUser() {
      const user = await new User({ ...req.body }).save();
  
      const accessToken = await user.token();
  
      const token = await generateTokenResponse(user, accessToken);
  
      return { token, user: user.transform() };
    }
  
    async function errorCreatingUser(error) {
        return User.checkDuplicateEmail(error);
      }
    
      return new APIResponse(res).create(createUser, errorCreatingUser);
    }
    export function login(req, res) {
        return new APIResponse(res).success(
          async () => {
            const { user, accessToken } = await User.findAndGenerateToken(req.body);
            const token = await generateTokenResponse(user, accessToken);
            const userTransformed = user.transform();
            return { token, user: userTransformed };
          },
          async (error) => {
            if (error instanceof APIError) {
              return error;
            }
            return new APIError({
              errorCode: error.errorCode || error,
              statusMessage: 'INVALID_REQUEST',
              status: 'BAD_REQUEST',
            });
          },
        );
      }

      export async function loginAdmin(req, res) {
        async function logAdmin() {
          const { user, accessToken } = await User.findAdminAndGenerateToken(req.body);
          const token = await generateTokenResponse(user, accessToken);
          const userTransformed = user.transform();
          return res.json({ token, user: userTransformed });
        }
        async function errorLoggingUser(error) {
          if (error instanceof APIError) {
            return error;
          }
          return new APIError({
            errorCode: error.errorCode || error,
            statusMessage: 'INVALID_REQUEST',
            status: 'BAD_REQUEST',
          });
        }
        return new APIResponse(res).success(logAdmin, errorLoggingUser);
      }

      export function refresh(req, res) {
        return new APIResponse(res).success(async () => {
          const { email, refreshToken } = req.body;
          const refreshObject = await RefreshToken.findOneAndRemove({
            userEmail: email,
            token: refreshToken,
          });
          const { user, accessToken } = await User.findAndGenerateToken({
            email,
            refreshObject,
          });
          const response = await generateTokenResponse(user, accessToken);
          return response;
        });
      }
      
      
              