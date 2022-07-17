import express from "express";
const router = express.Router();

// import the controller module
import { ProcessLogoutPage, ProcessLoginPage, ProcessRegisterPage } from '../Controllers/auth';

/* Process login page. */
router.post('/login', ProcessLoginPage);

/* Process register page. */
router.post('/register', ProcessRegisterPage);

/* Process logout page. */
router.get('/logout', ProcessLogoutPage);

export default router;