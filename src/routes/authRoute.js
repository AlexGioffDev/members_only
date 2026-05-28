import { Router } from "express";
import { getLoginPage, getSignUpPage, logOutCall, postSignup } from "../controllers/authController.js";
import passport from "passport";


const authRouter = Router();

authRouter.get('/signup', getSignUpPage)
authRouter.get('/login', getLoginPage)


authRouter.post('/signup', postSignup)
authRouter.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/auth/login'
}))
authRouter.post('/logout', logOutCall)


export default authRouter;