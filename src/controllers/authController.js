import { queryBecomeAMember, queryCreateUser, queryGetUserById } from "../db/queries.js";

export const getSignUpPage = (req, res) => {
    res.render('signup', { title: "Register New User" })
}


export const postSignup = async (req, res) => {

    const { firstName, lastName, username, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !username || !password || !confirmPassword) {
        res.render('signup', {
            title: "Register New User",
            error: "All fields are required!"
        })
        return;
    }

    if (password !== confirmPassword) {
        res.render('signup', {
            title: 'Register New User',
            error: 'Password must to be equals'
        })
        return;
    }

    try {
        await queryCreateUser(firstName, lastName, username, password);
        res.redirect('/')
    } catch (err) {
        console.log(err);

        res.render('signup', {
            title: 'Register New User',
            error: 'Error on save the user'
        })
    }

}


export const getLoginPage = (req, res) => {
    res.render('login', { title: "Login" })
}

export const logOutCall = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}

export const getBecomMemberPage = (req, res) => {
    res.render('member', { title: "Become a Member" })
}

export const postBecomeMember = async (req, res) => {
    const user = await queryGetUserById(req.user.user_id)

    if(req.body.secretWord !== process.env.SECRET_PASSWORD)
    {
        res.redirect('/');
        return
    }

    if (!user) {
        res.render('login', { title: "Login" })
        return;
    }

    try {
        await queryBecomeAMember(req.user.user_id)

        return res.redirect('/')
    } catch (err) {
        console.log(err)
        return res.redirect('/')
    }
}