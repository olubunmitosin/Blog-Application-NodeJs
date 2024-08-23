import { strlen, str_replace, trim, strtolower } from "locutus/php/strings";

/**
 * Default JSON Response structure
 * @param message string 
 * @param status boolean 
 * @param data object|null 
 * @returns object
 */
export function responseStructure (message: string, status: boolean = true, data: object|null = null): object {
    return {
        status: status,
        response: data,
        message: message,
    }
}

export const reshapingOptions = {
    // include .id (it's a virtual)
    virtuals: true,

    // exclude .__v
    versionKey: false,

    // exclude ._id
    transform: function (doc: any, ret: any) {
        delete ret._id;
        return ret;
    },
};

/**
 * Default json parameters
 * @returns array
 */
export function initialResponseParameters() {
    let responseData: object|null;
    let error: any;
    let statusValue: boolean;
    
    responseData = error = null;
    statusValue = false;

    return [responseData, statusValue, error];
}