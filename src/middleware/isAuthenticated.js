export const checkIsAuthenticated = (req, res, next) =>
{
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/auth/login');
}

export const checkIsNotAMember = (req, res, next) =>
{
    if(!req.user.is_member){
        return next();
    }

    res.redirect('/')
}

export const checkIsAdmin = (req, res, next) =>
{
    if(req.user.admin)
    {
        return next(); 
    }

    res.redirect('/')
}