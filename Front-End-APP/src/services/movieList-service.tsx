import http from '../components/http-common';
import MovieModel from '../models/movie';
import AuthHeader from './auth-header';

class MovieListDataService {
    readAll() {
        return http.get<Array<MovieModel>>("/movie-list", AuthHeader());
    }
}

export default new MovieListDataService();