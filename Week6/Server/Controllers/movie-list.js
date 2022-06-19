"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
const Util_1 = require("../Util");
function DisplayMovieList(req, res, next) {
    movie_1.default.find((err, moviesCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Movie List', page: 'movie-list', movies: moviesCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', movie: '', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=movie-list.js.map