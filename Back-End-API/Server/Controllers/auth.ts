import express from 'express';

// Need passport functionality
import passport from 'passport';

// Need to include User Model for Authentication Function
import User from '../Models/user';

// import the DisplayName utility function
import { UserDisplayName } from '../Util';

// Display Functions
export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)});
    }
    return res.redirect('/movie-list');
}

export function DisplayRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)});
    }
    return res.redirect('/movie-list');
}

// Processing Functions
export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    passport.authenticate('local', (err, user, info) => {
        // are there server errors?
        if (err) {
            console.error(err);
            res.end(err);
        }
        
        //are there login errors?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error!');
            return res.redirect('/login');
        }
        
        // no problems - we have right username and password
        req.logIn(user, (err) => {
            // are there db errors?
            if (err) {
                console.error(err);
                res.end(err);
            }
            
            return res.redirect('/movie-list');
        });
    })(req, res, next);
}

export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    // instantiate a new user object
    let newUser = new User({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstname + ' ' + req.body.lastname
    });
    
    User.register(newUser, req.body.password, (err) => {
        if(err) {
            if(err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error!');
            } else {
                console.error(err.name); // other error
                req.flash('registerMessage', 'Server Error!');
            }
            return res.redirect('/register');
        }
        
        //everything fine
        
        //automatically login user
        return passport.authenticate('local')(req, res, () => {
            return res.redirect('/movie-list');
        })
    });
}

export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.logOut((err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log("User logged out")
    });
    
    res.redirect('/login');
}