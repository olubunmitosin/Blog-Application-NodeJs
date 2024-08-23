import { Request, Response } from "express";
import { Validator } from 'node-input-validator';
import { responseStructure } from './utilityService';


/**
 * Validate Request
 * @param req
 * @param rules
 * @param res
 * @param type
 * @returns {Promise<(boolean|{response: null, message, status: boolean})[]>}
 */
export const validateRequest = async (req: Request, rules: any, res: Response, type: string = 'body') => {
    let validator: Validator;
    if (type === 'body') {
        validator = new Validator(req.body, rules);
    } else {
        validator = new Validator(req.query, rules);
    }

    const validationPassed: boolean = await validator.validate();
    if (!validationPassed) {
        let response = responseStructure("Validation not pass", false, validator.errors);
        return [false, response]
    }

    return [true, {}];
}