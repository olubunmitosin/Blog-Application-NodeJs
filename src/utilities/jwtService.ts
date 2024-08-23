import jwt from 'jsonwebtoken';
import { readPrivateKey, readPublicKey } from './cryptoService';
import { findSessions } from './sessionService';

const privateKey = readPrivateKey();
const publicKey = readPublicKey();

// Sign payload with private key
export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

// Verify JWT signature
export const verifyJwt = async (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    const decode = { valid: true, expired: false, decoded };
    // Validate that the user session is still valid
    const userId = (<any>decode.decoded)._doc._id;
    const sessions = await findSessions({ user: userId, valid: true });
    // If no valid sessions are found, return false
    if (sessions.length === 0) {
      return {
        valid: false,
        expired: true,
        decoded: null
      };
    } else {
      return decode;
    }
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null
    };
  }
};