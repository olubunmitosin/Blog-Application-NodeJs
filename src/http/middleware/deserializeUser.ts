import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../../utilities/jwtService';
import { reIssueAccessToken } from '../../utilities/sessionService';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  const refreshToken = get(req, 'headers.x-refresh-token');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = await verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = await verifyJwt(newAccessToken as string);
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;