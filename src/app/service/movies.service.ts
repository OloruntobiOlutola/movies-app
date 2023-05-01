import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MovieDetailDto,
  MovieImages,
  ResponseDTO,
  VideoResponse,
} from '../models/movies';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = 'c9a5fbc4d6b3ca56e96b01658de37aac';
  constructor(private httpClient: HttpClient) {}

  async getMovie(id: string) {
    return this.httpClient.get<MovieDetailDto>(
      `${this.baseUrl}movie/${id}?api_key=${this.apiKey}`
    );
  }

  async getMovieImages(id: string) {
    return this.httpClient.get<MovieImages>(
      `${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}`
    );
  }

  async getMovieVideos(id: string) {
    return this.httpClient
      .get<VideoResponse>(
        `${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  async getMovies(type: string, count: number = 12) {
    return this.httpClient
      .get<ResponseDTO>(`${this.baseUrl}movie/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  async searchMovies(page: number = 1) {
    return this.httpClient
      .get<ResponseDTO>(
        `${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
