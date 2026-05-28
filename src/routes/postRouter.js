import { Router } from "express";
import { checkIsAdmin, checkIsAuthenticated } from "../middleware/isAuthenticated.js";
import { deletePost, getCreatePage, postCreatePost } from "../controllers/postController.js";


const postRouter = Router();


postRouter.get('/create', checkIsAuthenticated, getCreatePage)
postRouter.post('/create', checkIsAuthenticated, postCreatePost)
postRouter.delete('/delete/:post_id', checkIsAuthenticated, checkIsAdmin, deletePost)

export default postRouter;