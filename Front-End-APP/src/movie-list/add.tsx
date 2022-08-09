import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieListDataService from '../services/movieList-service';
import MovieModel from '../models/movie';

function AddMovie() {
    const [ID, SetID] = useState('');
    const [MovieName, SetMovieName] = useState('');
    const [Year, SetYear] = useState('');
    const [Director, SetDirector] = useState('');
    const [Rating, SetRating] = useState('');
    const navigate = useNavigate(); // alias - convenience
    
    useEffect(()=>{
        document.title = "Add Movie";
    }, []);
    
    function onChangeMovieName(event: ChangeEvent<HTMLInputElement>) {
        SetMovieName(event.target.value);
    }
    
    function onChangeYear(event: ChangeEvent<HTMLInputElement> ) {
        SetYear(event.target.value);
    }

    function onChangeDirector(event: ChangeEvent<HTMLInputElement> ) {
        SetDirector(event.target.value);
    }

    function onChangeRating(event: ChangeEvent<HTMLInputElement> ) {
        SetRating(event.target.value);
    }
    
    function saveMovie(event: any) {
        event.preventDefault();
        const data: MovieModel = {
            Name: MovieName,
            Year: Year,
            Director: Director,
            Rating: Rating
        }
        
        MovieListDataService.create(data)
        .then((response: any) => {
            SetID(response.data.id);
            SetMovieName(response.data.Name);
            SetYear(response.data.Year);
            SetDirector(response.data.Director);
            SetRating(response.data.Rating);
        })
        .catch((e: Error) => {
            console.log(e);
        });
        
        navigate("/movie-list");
        window.location.reload();
    }
    
    return(
<div className="container">
    <h1 className="col-lg-6 col-md-10 col-sm-10">Add Movie</h1>
    <hr/>
    <div id="messageArea"></div>

    <div className="row justify-content-lg-center g-3">
        <form onSubmit={ saveMovie } className="col-lg-6 col-md-10 col-sm-10">

        <div className="input-group mb-3">
            <span className="input-group-text">Movie Name</span>
            <input id="movieName" name="movieName" type="text" className="form-control" 
            value = { MovieName }
            onChange = { onChangeMovieName } 
            aria-label="Movie Name" aria-describedby="Movie Name Input" required />
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Director Name</span>
            <input id="movieDirector" name="movieDirector" type="text" className="form-control" 
            value = { Director }
            onChange = { onChangeDirector } 
            aria-label="Director Name" aria-describedby="Movie Director Input" required />
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text">Year Released</span>
        <input id="movieYear" name="movieYear" type="text" className="form-control" 
        value = { Year }
        onChange = { onChangeYear } 
        aria-label="Movie Year" aria-describedby="Movie Year Input" required />
        </div>

        <div className="input-group mb-3">
        <span className="input-group-text">Rating</span>
        <input id="movieRating" name="movieRating" type="text" className="form-control" 
        value = { Rating }
        onChange = { onChangeRating } 
        aria-label="Movie Rating" aria-describedby="Movie Rating Input" required />
        </div>
        
        <button id="addButton" type="submit" className="btn btn-primary"><i className="fas fa-plus-circle fa-lg"></i> Add</button>  

        <Link to={"/movie-list"} id="cancelButton" type="button" className="btn btn-warning"><i className="fas fa-undo fa-lg"></i> Cancel</Link>
        
        </form>

    </div>
</div>
    );
}

export default AddMovie;