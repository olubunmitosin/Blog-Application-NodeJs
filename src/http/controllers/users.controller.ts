import { Request, Response } from "express";
import { initialResponseParameters, responseStructure} from "../../utilities/utilityService";
import { findSessions, updateSession } from "../../utilities/sessionService";


/**
 * Logout user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const logoutUser = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;
    // Get auth user
    const userId = (<any>res.locals.user)._doc._id;

    // Try block
    try {
        // Invalidate all user sessions including current one
        for (const doc of await findSessions({ user: userId })) {
            await updateSession({ _id: doc._id }, { valid: false });
        }
        responseMessage = "Logout successfully";
        statusValue = true;

    } catch (e) {
        console.log(e);
        responseMessage = "An error occurred";
    }

    let response = responseStructure(responseMessage, statusValue, responseData);
    // send back response
    res.send(response);
}
