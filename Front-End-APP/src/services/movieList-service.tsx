import http from '../components/http-common';
import MovieModel from '../models/movie';
import AuthHeader from './auth-header';

class MovieListDataService {
    create(data: MovieModel) {
        return http.post<MovieModel>("/add", data, AuthHeader());
    }
    
    readAll() {
        return http.get<Array<MovieModel>>("/movie-list", AuthHeader());
    }
    
    readOne(id: any) {
        return http.get<MovieModel>(`/edit/${id}`, AuthHeader());
    }
    
    update(data: MovieModel, id: any) {
        return http.post<MovieModel>(`/edit/${id}`, data, AuthHeader());
    }
    
    delete(id: any) {
        return http.get<MovieModel>(`/delete/${id}`, AuthHeader());
    }
}

export default new MovieListDataService();