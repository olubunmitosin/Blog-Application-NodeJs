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

/**
 * Default json parameters
 * @returns array
 */
export function initialResponseParameters() {
    let responseData: object|null, error, statusValue: boolean;
    responseData = error = null;
    statusValue = false;

    return [responseData, statusValue, error];
}


/**
 * Generate random integer value
 * @param length number 
 * @returns number
 */
export function randInt(length: number): number {
    return (Math.random() * Math.pow(10, length - 1) + Math.pow(10, length -1) );
}

/**
 * Generate random string value
 * @param length number 
 * @returns number
 */
export function generateRandomString (length: number): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = strlen(characters);

    let randomString = '';
    for (let i = 0; i < length; i++) {
        let char = characters[Math.floor((Math.random() * charactersLength - 1))];
        if (char && typeof char !== "undefined") {
            randomString += characters[Math.floor((Math.random() * charactersLength - 1))];
        } else {
            length++;
        }
    }
    return randomString;
}


/**
 * Get pagination
 * @param page number
 * @param size number
 * @returns object
 */
export function getPagination(page: number, size: number): object {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
}

/**
 * Get pading data
 * @param data any
 * @param page number
 * @param limit number
 * @returns object
 */
export function getPagingData(data: any, page: number, limit: number): object {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, items, totalPages, currentPage };
}

/**
 * Convert a normal string to slug
 * @param nameString string
 * @returns string
 */
export function convertToSlug (nameString: string): string {
    // Check if this is actually a string
    if (typeof nameString === "string") {
        nameString = str_replace(' ','', strtolower(nameString)) // Replaces all spaces with hyphens.
        nameString = str_replace(' ','', strtolower(nameString)) // Replaces all spaces with hyphens.
        nameString = nameString.replace('/[^A-Za-z0-9\-]/', '') // Removes special chars.
        nameString = nameString.replace('/-+/', '-') // Replaces multiple hyphens with single one.
        return trim(nameString);
    }

    return trim(nameString);
}