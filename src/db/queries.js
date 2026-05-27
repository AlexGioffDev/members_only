import pool from './pool.js';
import bcrypt from "bcryptjs"

export const queryCreateUser = async (firstName, lastName, username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const {rows} = await pool.query("INSERT INTO users(first_name, last_name, username, password) VALUES($1, $2, $3, $4)", [firstName, lastName, username, hashedPassword])
    return rows;
}