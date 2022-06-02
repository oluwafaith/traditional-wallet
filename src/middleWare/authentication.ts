import {Request, Response, Application} from 'express'
import CustomError from '../errors';
import{ isTokenValid } from '../utils';

const authenticateUser = async (req: any, res: Response, next: any) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { name, userId, role }: any = isTokenValid({ token });

    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles: any[]) => {
  return (req: any, res: Response, next: Application) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    // next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
