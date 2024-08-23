import { type Response, type NextFunction, type Request } from 'express';
import { HttpCode } from '../../enums/httpCode';
import { AppError } from '../../utilities/appError';
import { responseStructure } from '../../utilities/utilityService';
import AuthenticationTokenException from '../exceptions/authentication.exception';

export class ErrorMiddleware {
    // Handle HTTPS request errors
    public static handleError = (error: any, _: Request, res: Response, next: NextFunction): void => {
        if (error instanceof AppError) {
            const { message, name, stack, validationErrors } = error;
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(responseStructure(name + ": " + message, false, validationErrors));
        } else if (error instanceof AuthenticationTokenException) {
            const name = 'AuthenticationTokenError';
            const message = error.message;
            const statusCode = HttpCode.UNAUTHORIZED;
            res.statusCode = statusCode;
            res.json(responseStructure(name + ": " + message, false, []));
        } else {
            const name = 'InternalServerError';
            const message = error?.message ?? 'An internal server error occurred';
            const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(responseStructure(name + ": " + message, false, []));
        }
        // forward request
        next();
    };
}