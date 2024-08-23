import express, { Express } from "express";
import { login, register } from "../http/controllers/auth.controller";
const router = express.Router();


const authRoutes = (app: Express) => {
    // Common routes
    router.post("/login", login);
    router.post("/register", register);

    // Load router routes into app base url
    app.use('/api/auth', router);
};

export default authRoutes;
