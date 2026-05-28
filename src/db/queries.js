import pool from './pool.js';
import bcrypt from "bcryptjs"

export const queryCreateUser = async (firstName, lastName, username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const {rows} = await pool.query("INSERT INTO users(first_name, last_name, username, password) VALUES($1, $2, $3, $4)", [firstName, lastName, username, hashedPassword])
    return rows;
}

export const queryGetAllPost = async () => {
    const {rows} = await pool.query("SELECT posts.*, users.username FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER BY posts.created_at DESC;")
    return rows;
}

export const queryCreatePost = async (title, body, user_id) =>
{
    const {rows} = await pool.query("INSERT INTO posts(title, body, user_id) VALUES($1, $2, $3);", [title, body, user_id]);
    return rows;
}

export const queryGetUserById = async (user_id) =>
{
    const {rows} = await pool.query("SELECT user_id FROM users WHERE user_id = $1;", [user_id]);
    return rows[0]
}

export const queryBecomeAMember = async (user_id) =>
{
    const {rows} = await pool.query("UPDATE users SET is_member = TRUE WHERE user_id = $1;", [user_id])
    return rows;
}

export const queryDeletePost = async (post_id) =>
{
    const {rows} = await pool.query("DELETE FROM posts WHERE post_id = $1;", [post_id])
    return rows;
}