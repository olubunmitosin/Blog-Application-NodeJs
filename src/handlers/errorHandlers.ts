import { type Response, type NextFunction, type Request } from 'express';
import { HttpCode } from '../enums/httpCode';
import { AppError } from '../utilities/appError';
import { responseStructure } from '../utilities/utilityService';

export class ErrorMiddleware {
    // Handle HTTPS request errors
    public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
        if (error instanceof AppError) {
            const { message, name, stack, validationErrors } = error;
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(responseStructure(name + ": " + message, false, validationErrors));
        } else {
            const name = 'InternalServerError';
            const message = 'An internal server error occurred';
            const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(responseStructure(name + ": " + message, false, []));
        }
        // forward request
        next();
    };
}