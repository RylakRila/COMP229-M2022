import express from "express";
const router = express.Router();

import { AuthGuard } from "../Util";

import { DisplayMovieList, DisplayAddPage, DisplayEditPage, ProcessAddPage, ProcessEditPage, ProcessDeletePage } from '../Controllers/movie-list';

router.get('/movie-list', DisplayMovieList);

/* Display Add Page */
router.get('/add', DisplayAddPage);

/* Display Edit Page */
router.get('/edit/:id', DisplayEditPage);

/* Process Add Page */
router.post('/add', ProcessAddPage);

/* Process Edit Page */
router.post('/edit/:id', ProcessEditPage);

/* Process Delete Page */
router.get('/delete/:id', ProcessDeletePage);

export default router;