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
    
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    
}