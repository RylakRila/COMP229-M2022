import createError from 'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// import db package
import mongoose from 'mongoose';

// Step 1 for Auth - import modules
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// modules for JWT Support
import cors from 'cors';
import passportJWT from 'passport-jwt';

// define JWT Alias
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Step 2 for auth - alias our auth objects
let localStrategy = passportLocal.Strategy;

// Step 3 for auth - import the user model
import User from '../Models/user';

// import the router data
import movieListRouter from '../Routes/movie-list'; // movie-list routes
import authRouter from '../Routes/auth';

const app = express();

// Complete the DB Configuration
import * as DBConfig from './db'; 
mongoose.connect(DBConfig.RemoteURI || DBConfig.LocalURI);
const db = mongoose.connection; // alias for mongoose connection

// Listen for connections or Errors
db.on("open", () => {
  console.log(`Connected to MongoDB at ${(DBConfig.RemoteURI) ? DBConfig.HostName : "localhost"}`);
});

db.on("error", () => {
  console.error(`Connection Error`);
});

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors()); // add CORS (cross-origin resources sharing) to the config

// Step 4 - for auth - setup express session
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false
}))

// Step 5 for auth - setup flash
app.use(flash());

// Step 6 - initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Step 7 - implement the Auth Strategy
passport.use(User.createStrategy());

// Step 8 - setup serilization and deserilization (encoding and decoding)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup JWT Options
let jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: DBConfig.Secret
};

// setup JWT Strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then(user => {
    return done(null, user);
  })
  .catch(err => {
    return done(err, false);
  });
});

passport.use(strategy);

// use routes
app.use('/api', authRouter);
app.use('/api', passport.authenticate('jwt', {session: false}), movieListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
