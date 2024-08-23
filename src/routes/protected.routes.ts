import { logoutUser } from "../http/controllers/users.controller";
import { getPosts, updatePost, createPost, getSinglePost, deletePost } from "../http/controllers/posts.controller";
import express, { Express } from "express";
import { requireUser } from "../http/middleware";
const router = express.Router();


const protectedRoutes = (app: Express) => {
  router.post("/logout", [requireUser], logoutUser);

  router.get("/posts", [requireUser], getPosts);
  router.get("/posts/single/:postId", [requireUser], getSinglePost);
  router.post("/posts/create", [requireUser], createPost);
  router.post("/posts/update", [requireUser], updatePost);
  router.post("/posts/delete", [requireUser], deletePost);

  // Load router routes into app base url
  app.use('/api/user', router);
};

export default protectedRoutes;

