import { Request, Response } from "express";
import { initialResponseParameters, reshapingOptions, responseStructure} from "../../utilities/utilityService";
import { createPostRules, updatePostRules, deletePostRules } from "../requests/post_request"; 
import { validateRequest } from "../../utilities/validationService";
import { PostDocument } from "../../interfaces/models";
import PostModel from "../../models/post.model";


/**
 * Get User Posts
 * @param req 
 * @param res 
 */
export const getPosts = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;
    // Get auth user
    const userId = (<any>res.locals.user)._doc._id;
    // Try block
    try {
        const posts = await PostModel.find({user_id: userId}).select('title _id content createdAt updatedAt').exec();
        responseData = posts;
        // Logout successful
        responseMessage = "Query ok!";
        statusValue = true;

    } catch (e) {
        responseMessage = "An error occurred";
    }
    let response = responseStructure(responseMessage, statusValue, responseData);
    // send back response
    res.send(response);
}


/**
 * Get Single Post
 * @param req 
 * @param res 
 */
export const getSinglePost = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;
    // Get auth user
    const userId = (<any>res.locals.user)._doc._id;
    const postId = req.params.postId;

    // Try block
    try {
        // Find post
        let post: PostDocument|null;
        try {
            post = await PostModel.findOne({user_id: userId, _id: postId});
        } catch (e) {
            post = null;
        }

        if (!post) {
            responseMessage = "Post not found!";
        } else {
            responseData = post?.toObject(reshapingOptions);
            responseMessage = "Query ok!";
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
 * Create a new post
 * @param req 
 * @param res 
 */
export const createPost = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Validate request parameters
    const [passed, validationResponse] = await validateRequest(req, createPostRules, res);
    if (!passed) {
        res.send(validationResponse);
        return;
    }
    // Get auth user
    const userId = (<any>res.locals.user)._doc._id;

    // Try block
    try {
        const data = req.body;
        // Create post
        data.user_id = userId;

        // Check if same post has been created
        const exists = await PostModel.countDocuments({title: data.title}).exec();
        if (exists > 0) {
            responseMessage = "Post with same title already exists!";
        } else {
            const post = await PostModel.create(data);
            responseData = post.toObject(reshapingOptions);
            responseMessage = "Query ok!";
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
 * Update post
 * @param req 
 * @param res 
 */
export const updatePost = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;

    // Validate request parameters
    const [passed, validationResponse] = await validateRequest(req, updatePostRules, res);
    if (!passed) {
        res.send(validationResponse);
        return;
    }
    // Get auth user
    const userId = (<any>res.locals.user)._doc._id;

    // Try block
    try {
        const data = req.body;
        // Find post
        let post: PostDocument|null;
        try {
            post = await PostModel.findOne({user_id: userId, _id: data.id});
        } catch (e) {
            post = null;
        }
        // Prevents someone from updating another user's post.
        if (!post) {
            responseMessage = "Post not found!";
        } else {
            // Update post
            await PostModel.findByIdAndUpdate(data.id, data);
            responseMessage = "Post updated successfully!";
            statusValue = true;
        }

    } catch (e) {
        responseMessage = "Post not found and could not be updated!";
    }
    let response = responseStructure(responseMessage, statusValue, responseData);
    // send back response
    res.send(response);
}

/**
 * Delete Post
 * @param req 
 * @param res 
 */
export const deletePost = async (req: Request, res: Response) => {
    // Get initial response parameters
    let [responseData, statusValue, error] = initialResponseParameters();
    let responseMessage;
    // Validate request parameters
    const [passed, validationResponse] = await validateRequest(req, deletePostRules, res);
    if (!passed) {
        res.send(validationResponse);
        return;
    }
    // Get auth user
    const userId = (<any>res.locals.user)._doc._id;

    // Try block
    try {
        const data = req.body;
        // Find post
        let post: PostDocument|null;
        try {
            post = await PostModel.findOne({user_id: userId, _id: data.id});
        } catch (e) {
            post = null;
        }
        // If post is not found, return error message
        if(!post) {
            responseMessage = "Post not found!";
        } else {
            // delete post
            await PostModel.findOneAndDelete({user_id: userId, _id: data.id}).exec();
            responseMessage = "Post deleted successfully!";
            statusValue = true;
        }

    } catch (e) {
        responseMessage = "An error occurred";
    }
    let response = responseStructure(responseMessage, statusValue, responseData);
    // send back response
    res.send(response);
}
