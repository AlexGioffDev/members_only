import { queryCreateUser } from "../db/queries.js";

export const getSignUpPage = (req, res) => {
    res.render('signup', {title: "Register New User"})
}


export const postSignup = async (req, res) => {

    const {firstName, lastName, username, password, confirmPassword} = req.body;
    
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
        res.render('signup', {
            title: "Register New User",
            error: "All fields are required!"
        })
        return;
    }

    if(password !== confirmPassword){
        res.render('signup', {
            title: 'Register New User',
            error: 'Password must to be equals'
        })
        return;
    }

    try {
        await queryCreateUser(firstName, lastName, username, password);
        res.redirect('/auth/signup')
    } catch (err) {
        console.log(err);

        res.render('signup', {
            title: 'Register New User',
            error: 'Error on save the user'
        })
    }

}


export const getLoginPage = (req, res) => {
    res.render('login', {title: "Login"})
}