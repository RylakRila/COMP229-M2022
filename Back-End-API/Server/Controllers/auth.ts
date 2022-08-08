import express from 'express';

// Need passport functionality
import passport from 'passport';

// Need to include User Model for Authentication Function
import User from '../Models/user'; 

import { GenerateToken } from '../Util';

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
            return res.json({sucess: false, msg: 'ERROR: Authentication Error'})
        }
        
        // no problems - we have right username and password
        req.logIn(user, (err) => {
            // are there db errors?
            if (err) {
                console.error(err);
                res.end(err);
            }
            
            const authToken = GenerateToken(user);
            
            return res.json({success: true, msg: 'User Logged In Successfully!', user: {
                id: user._id,
                DisplayName: user.DisplayName,
                username: user.username,
                EmailAddress: user.EmailAddress
            }, token: authToken});
        });
        
        return;
    })(req, res, next);
}

export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    // instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + ' ' + req.body.lastName
    });
    
    User.register(newUser, req.body.password, (err) => {
        if(err) {
            if(err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
            } else {
                console.error(err.name); // other error
            }
            return res.json({success: false, msg: 'ERROR: Registration Failed!  '})
        }
        
        //everything fine
        
        return res.json({success: true, msg: 'User Registered Successfully!'});
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
    
    res.json({success: true, msg: 'User Logged out Successfully!'});
}