import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import movieListDataService from "../services/movieList-service";
import MovieModel from '../models/movie';

function MovieList() {
    const [movies, setMovies] = useState<Array<MovieModel>>([]);
    
    useEffect(() => {
        document.title = "Movie List";
        getMovieList();
    }, []);
    
    function getMovieList() {
        movieListDataService.readAll()
        .then((response: any) => {
            setMovies(response.data.movies);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    }
    
    function deleteContact(id: string) {
        
    }
    
    function confirmDelete(id: string) {
        if(!window.confirm("Are you sure?")) {
            
        }
    }

    return(
        <div className="container">
            <h1>Movie List</h1>
        <div className="row">
            <div className="col">
                
                <Link to={"/add"} id="addButton" className="btn btn-primary mb-1"><i className="fa-solid fa-plus-circle"></i> Add Movie</Link>
                
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Year</th>
                            <th scope="col">Director</th>
                            <th scope="col">Rating</th>
                            <th></th>
                            <th></th>
                        </tr>    
                    </thead>
                    <tbody id="movieList">
                        { /* Repeatable rows */ }
                        
                        { movies && 
                        movies.map((movie: MovieModel, index: number) => {
                            return(
                                <tr key="{index}">
                                    <th scope="row" className="text-center">{index + 1}</th>
                                    <td>{ movie.Name }</td>
                                    <td>{ movie.Year }</td>
                                    <td>{ movie.Director }</td>
                                    <td>{ movie.Rating }</td>
                                    <td className="text-center"><Link to={'/edit/${movie._id}'} className="btn btn-primary btn-sm edit"><i className="fa-solid fa-pen-to-square"></i> Edit</Link></td>
                                    <td className="text-center"><button onClick={() => {
                                        confirmDelete(movie._id);
                                    }} className="btn btn-danger btn-sm delete"><i className="fa-solid fa-trash-can"></i> Delete</button></td>
                                </tr>
                            );
                        }) }
                    </tbody>
                </table>    
            </div>
        </div>
        </div>
    );
}

export default MovieList;