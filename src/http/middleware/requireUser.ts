import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import UserNotFoundException from '../exceptions/userNotFound.exception';
import AuthenticationTokenException from '../exceptions/authentication.exception';
import NotAuthorizedException from '../exceptions/notAuthorized.exception';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  // const user = res.locals.user;
  const user = get(res, 'locals.user');
  if (!user) {
    if (typeof user === "undefined") {
      return next(new NotAuthorizedException());
    } else {
      const userId = get(user, '_id');
      if (userId !== undefined) {
        return next(new UserNotFoundException(userId));
      } else {
        return next(new AuthenticationTokenException());
      }
    }
  }
  return next();
};

export default requireUser;