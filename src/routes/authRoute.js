import { Router } from "express";
import { getBecomMemberPage, getLoginPage, getSignUpPage, logOutCall, postBecomeMember, postSignup } from "../controllers/authController.js";
import passport from "passport";
import { checkIsAuthenticated, checkIsNotAMember } from "../middleware/isAuthenticated.js";


const authRouter = Router();

authRouter.get('/signup', getSignUpPage)
authRouter.get('/login', getLoginPage)
authRouter.get('/member', checkIsAuthenticated, checkIsNotAMember, getBecomMemberPage)


authRouter.post('/signup', postSignup)
authRouter.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/'
}))
authRouter.post('/member', checkIsAuthenticated,postBecomeMember)
authRouter.post('/logout', logOutCall)


export default authRouter;