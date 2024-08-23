import { Request, Response } from "express";
import { initialResponseParameters, responseStructure} from "../../utilities/utilityService";
import { validateRequest } from "../../utilities/validationService";
import { createUser, validatePassword } from "../../utilities/userService";
import { loginRules, registerRules } from "../requests/user_request"; 
import { createSession } from "../../utilities/sessionService";
import { signJwt } from "../../utilities/jwtService";
import UserModel from "../../models/user.model";
import { is_null } from "locutus/php/var";
import dotenv from "dotenv";
dotenv.config();


/**
 * Get login
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const login = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Validate request parameters
    const [passed, validationResponse] = await validateRequest(req, loginRules, res);
    if (!passed) {
        res.send(validationResponse);
        return;
    }

    // Try block
    try {
        const data = req.body;
        // Check if this user exists
        const user = await UserModel.findOne({ email: data.email }).exec();
        if (is_null(user)) {
            responseMessage = "Account with supplied email does not exists";

        } else if (!await validatePassword(data)) {
            responseMessage = "Invalid credentials provided!";
        } else {
            // Create a session
            const session = await createSession(user?._id, req.get('user-agent') || '');
            const signData = { ...user, session: session._id };

            // Create an access token
            const accessTokenTtl = process.env.JWT_EXPIRY; // 15 minutes
            const accessToken = signJwt(signData, { expiresIn: accessTokenTtl });

            // Create an refresh token
            const refreshTokenTtl = process.env.JWT_REFRESH_EXPIRY; // 1 year
            const refreshToken = signJwt(signData, { expiresIn: refreshTokenTtl });

            responseData = {
                'access_token' : accessToken,
                'refresh_token' : refreshToken,
                'token_type': 'Bearer',
                'expires_at': accessTokenTtl,
            };
            responseMessage = "Login successful";
            statusValue = true;
        }

    } catch (e) {
        responseMessage = "An error occurred";
    }

    let response = responseStructure(responseMessage, statusValue, responseData);
    // send back response
    res.send(response);
}


/**
 * Rgister User
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const register = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Validate request parameters
    const [passed, validationResponse] = await validateRequest(req, registerRules, res);
    if (!passed) {
        res.send(validationResponse);
        return;
    }

    // Try block
    try {
        const data = req.body;
        // Check if this user exists
        const user = await UserModel.findOne( { email: data.email }).exec();

        if (!is_null(user)) {
            responseMessage = "Account with supplied email already exists. Try to login";

        } else {
            // Create user account
            const user = await createUser(data);
            responseData = {
                'id' : user._id,
                'name': user.name,
                'email': user.email
            };
            responseMessage = "Registration successful";
            statusValue = true;
        }

    } catch (e) {
        responseMessage = "An error occurred";
    }
    let response = responseStructure(responseMessage, statusValue, responseData);
    // send back response
    res.send(response);
}