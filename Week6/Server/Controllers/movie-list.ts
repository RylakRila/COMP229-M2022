import express from 'express';

import Movie from '../Models/movie';

import { UserDisplayName } from '../Util';

export function DisplayMovieList(req: express.Request, res: express.Response, next: express.NextFunction): void {
    Movie.find((err, moviesCollection) => {
        
        if(err) {
            console.error(err);
            res.end(err);
        }
        
        res.render('index', {title: 'Movie List', page: 'movie-list', movies: moviesCollection, displayName: UserDisplayName(req) });
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.render('index', { title: 'Add', page: 'edit', movie: '', displayName: UserDisplayName(req) })
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let id = req.params.id;
    
    // pass the id to the db and read the movie into the edit page
    Movie.findById(id, {}, {}, (err, movieToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        
        res.render('index', {title: 'Edit', page: 'edit', movie: movieToEdit, displayName: UserDisplayName(req)})
    });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let newMovie = new Movie({
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });
    
    // Insert new movie to database
    Movie.create(newMovie, (err: ErrorCallback) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        
        res.redirect('/movie-list');
    });
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    
}