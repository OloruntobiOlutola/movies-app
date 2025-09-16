import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MovieCredits,
  MovieCreditsResponse,
  MovieDetailDto,
  MovieImages,
  ResponseDTO,
  VideoResponse,
} from '../models/movies';
import { of, switchMap } from 'rxjs';
import { GenreDto } from '../models/genres';

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

  async getMovieCredits(id: string) {
    return this.httpClient.get<MovieCreditsResponse>(
      `${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`
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

  async getMovieGenres() {
    return this.httpClient
      .get<GenreDto>(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  async getMovies(type: string, count: number = 12) {
    return this.httpClient
      .get<ResponseDTO>(`${this.baseUrl}movie/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of({
            res: res.results.slice(0, count),
            totalCount: res.total_results > 10000 ? 10000 : res.total_results,
          });
        })
      );
  }

  async getMoviesByCategory(genreId: string, page: number = 1) {
    return this.httpClient
      .get<ResponseDTO>(
        `${this.baseUrl}discover/movie?with_genres=${genreId}&api_key=${this.apiKey}&page=${page}`
      )
      .pipe(
        switchMap((res) => {
          return of({
            res: res.results,
            totalCount: res.total_results > 10000 ? 10000 : res.total_results,
          });
        })
      );
  }

  async getSimilarMovies(id: string, count: number = 4) {
    return this.httpClient
      .get<ResponseDTO>(
        `${this.baseUrl}movie/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of({
            res: res.results.slice(0, count),
            totalCount: res.total_results > 10000 ? 10000 : res.total_results,
          });
        })
      );
  }

  async searchMovies(page: number = 1, value?: string) {
    const uri = value
      ? `${this.baseUrl}search/movie?api_key=${this.apiKey}&page=${page}&query=${value}`
      : `${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}`;
    return this.httpClient.get<ResponseDTO>(uri).pipe(
      switchMap((res) => {
        return of({
          res: res.results,
          totalCount: res.total_results > 10000 ? 10000 : res.total_results,
        });
      })
    );
  }
}
