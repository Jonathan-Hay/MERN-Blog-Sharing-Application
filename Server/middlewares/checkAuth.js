const KEY = 'supersecret';
import jwt from 'jsonwebtoken';

export function createToken(email) {
    return jwt.sign({ email }, KEY, { expiresIn: '1h' });
  }

export function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
        console.log("OPTIONS");

      return next();
    }
    if (!req.headers.authorization) {
      console.log('NOT AUTH. AUTH HEADER MISSING.');
      return next(new NotAuthError('Not authenticated.'));
    }
    const authFragments = req.headers.authorization.split(' ');
  
    if (authFragments.length !== 2) {
      console.log('NOT AUTH. AUTH HEADER INVALID.');
      return next(new NotAuthError('Not authenticated.'));
    }
    const authToken = authFragments[1];
    try {
      const validatedToken = jwt.verify(authToken, KEY);
      req.token = validatedToken;
    } catch (error) {
      console.log('NOT AUTH. TOKEN INVALID.');
      return next(new NotAuthError('Not authenticated.'));
    }
    console.log("AUTH");

    next();
  }
  
class NotAuthError {
    constructor(message) {
      this.message = message;
      this.status = 401;
    }
  }