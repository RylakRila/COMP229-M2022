"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
function DisplayMovieList(req, res, next) {
    movie_1.default.find((err, moviesCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, message: 'Movie-List Displayed Successfully', movies: moviesCollection, user: req.user });
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayAddPage(req, res, next) {
    res.json({ success: true, message: 'Add Page Displayed Successfully' });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    movie_1.default.findById(id, {}, {}, (err, movieToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, message: 'Edit Page Displayed Successfully', movie: movieToEdit });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newMovie = new movie_1.default({
        "Name": req.body.Name,
        "Director": req.body.Director,
        "Year": req.body.Year,
        "Rating": req.body.Rating
    });
    movie_1.default.create(newMovie, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, message: 'Successfully Added Movie', movie: newMovie });
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedMovie = new movie_1.default({
        "_id": id,
        "Name": req.body.Name,
        "Director": req.body.Director,
        "Year": req.body.Year,
        "Rating": req.body.Rating
    });
    movie_1.default.updateOne({ _id: id }, updatedMovie, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, message: 'Successfully Edited Movie', movie: updatedMovie });
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    movie_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, message: 'Successfully Deleted Movie' });
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=movie-list.js.map