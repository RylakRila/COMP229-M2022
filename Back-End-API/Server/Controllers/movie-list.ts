import express from 'express';
import { CallbackError } from 'mongoose';

import Movie from '../Models/movie';

import { UserDisplayName } from '../Util';

export function DisplayMovieList(req: express.Request, res: express.Response, next: express.NextFunction): void {
    Movie.find((err, moviesCollection) => {
        
        if(err) {
            console.error(err);
            res.end(err);
        }
        
        // res.render('index', {title: 'Movie List', page: 'movie-list', movies: moviesCollection, displayName: UserDisplayName(req) });
        
        res.json({success: true, message: 'Movie-List Displayed Successfully', movies: moviesCollection, user: req.user});
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.json({success: true, message: 'Add Page Displayed Successfully'});
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let id = req.params.id;
    
    // pass the id to the db and read the movie into the edit page
    Movie.findById(id, {}, {}, (err, movieToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        
        res.json({success: true, message: 'Edit Page Displayed Successfully', movies: movieToEdit});
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
    Movie.create(newMovie, (err: CallbackError) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        
        res.json({success: true, message: 'Successfully Added Movie', movie: newMovie});
    });
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let id = req.params.id;
    
    let updatedMovie = new Movie({
        "_id": id,
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });
    
    Movie.updateOne({_id: id}, updatedMovie, (err: CallbackError) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        
        // edit sucessed
        res.json({success: true, message: 'Successfully Edited Movie', movie: updatedMovie});
    });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let id = req.params.id;
    
    // pass the id to the database and delete that movie
    Movie.remove({_id: id}, (err: CallbackError) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        
        //delete was successful
        res.json({success: true, message: 'Successfully Deleted Movie'});
    });
}