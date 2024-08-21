import { HttpCode } from "../enums/httpCode";

// Validation type interface
export interface ValidationType {
    fields: string[];
    constraint: string;
}

// Application error interface
export interface AppErrorArgs {
    name?: string;
    statusCode: HttpCode;
    message: string;
    isOperational?: boolean;
    validationErrors?: ValidationType[];
}