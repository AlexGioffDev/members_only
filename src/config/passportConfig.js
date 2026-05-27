import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from '../db/pool.js';
import bcrypt from "bcryptjs";

export const configurePassport = () => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
                const user = rows[0];

                if (!user) return done(null, false, { message: "user dosen't exist" });

                const match = await bcrypt.compare(password, user.password);

                if (!match) return done(null, false, { message: "wrong data!" });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
            done(null, rows[0]);
        } catch (err) {
            return done(err);
        }
    })
}