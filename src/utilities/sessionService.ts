import { FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import SessionModel from '../models/session.model';
import { SessionDocument } from '../interfaces/models';
import { verifyJwt, signJwt } from './jwtService';
import { findUser } from './userService';
import dotenv from "dotenv";
dotenv.config();

// Create a new session
export const createSession = async (userId: any, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

// Find sessions
export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean();
};

// update a session
export const updateSession = async (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
  return SessionModel.updateOne(query, update);
};

// Reissue token
export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: any }) => {
  const { decoded } = await verifyJwt(refreshToken);
  if (!decoded || !get(decoded, 'session')) return false;

  const sessionId = get(decoded, 'session');
  const session = await SessionModel.findById(sessionId);

  // return false if the session does not exist or invalid
  if (!session || !session.valid) return false;

  // Try to find user
  const user = await findUser({ _id: session.user });

  // return false if user is not found
  if (!user) return false;

  const accessTokenTtl = process.env.JWT_EXPIRY;
  const accessToken = signJwt({ ...user, session: session._id }, { expiresIn: accessTokenTtl });
  return accessToken;
};