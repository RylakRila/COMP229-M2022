import express from "express";
const router = express.Router();

// import the controller module
import { DisplayRegisterPage, ProcessLogoutPage, DisplayLoginPage, ProcessLoginPage, ProcessRegisterPage } from '../Controllers/auth';

/* Display login page. */
router.get('/login', DisplayLoginPage);

/* Display register page. */
router.get('/register', DisplayRegisterPage);



/* Process login page. */
router.post('/login', ProcessLoginPage);

/* Process register page. */
router.post('/register', ProcessRegisterPage);

/* Process logout page. */
router.get('/logout', ProcessLogoutPage);

export default router;