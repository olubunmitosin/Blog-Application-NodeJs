import HttpException from './http.exception';

class AuthenticationTokenException extends HttpException {
  constructor() {
    super(401, `Invalid Authentication Token!`);
  }
}

export default AuthenticationTokenException;