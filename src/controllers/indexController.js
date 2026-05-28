import { queryGetAllPost } from "../db/queries.js"


export const getHomePage = async (req, res) => {
    try {
        const posts = await queryGetAllPost();
        return res.render('index', {title: "HomePage", posts: posts});
    } catch (err) {
        console.error(err);
        return res.render('index', {title: "HomePage"})
    }

}