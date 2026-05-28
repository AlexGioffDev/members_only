import 'dotenv/config'
import express from 'express'
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url'
import { configurePassport } from './src/config/passportConfig.js';
import authRouter from './src/routes/authRoute.js';
import methodOverride from 'method-override'
import indexRouter from './src/routes/homeRoute.js';
import postRouter from './src/routes/postRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// Engine
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
configurePassport();
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


// Routes
app.use('/auth', authRouter);
app.use('/', indexRouter)
app.use('/post', postRouter);

// listen
app.listen(3000, (err) => {
    if (err) throw err;

    console.log(`Server on port; 3000`)
})