import express from "express";
const router = express.Router();

import { DisplayMovieList, ProcessAddPage, ProcessEditPage, ProcessDeletePage, DisplayAddPage, DisplayEditPage } from '../Controllers/movie-list';

router.get('/movie-list', DisplayMovieList);

router.get('/add', DisplayAddPage);

router.get('/edit/:id', DisplayEditPage);

/* Process Add Page */
router.post('/add', ProcessAddPage);

/* Process Edit Page */
router.post('/edit/:id', ProcessEditPage);

/* Process Delete Page */
router.get('/delete/:id', ProcessDeletePage);

export default router;