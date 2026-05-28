import { queryCreatePost, queryDeletePost, queryGetUserById } from "../db/queries.js"


export const getCreatePage = (req, res) => {
    return res.render('create', { title: "Create a new Post" })
}


export const postCreatePost = async (req, res) => {
    const { title, body } = req.body;
    const userId = req.user.user_id;
    let user = await queryGetUserById(req.user.user_id)

    try {
        const user = await queryGetUserById(userId);

        if (!user) {
            return res.render('login', { title: "Login" });
        }

        await queryCreatePost(title, body, userId);
        return res.redirect('/');

    } catch (error) {
        console.error("Errore durante la creazione del post:", error);
        return next(error);
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        await queryDeletePost(post_id);

        return res.redirect('/')
    } catch (error) {
        return next(error);
    }
}