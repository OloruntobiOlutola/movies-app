import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IMAGE_SIZE_URL } from 'src/app/constants/image-size-url';
import {
  Movie,
  MovieCredits,
  MovieDetailDto,
  MovieImages,
  MovieVideoDto,
} from 'src/app/models/movies';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'movies-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie!: MovieDetailDto;
  imageurl: string = IMAGE_SIZE_URL.medium;
  largeUrl: string = IMAGE_SIZE_URL.large;
  movieVideos!: MovieVideoDto[];
  movieImages!: MovieImages;
  movieCredits!: MovieCredits[];
  similarMovies!: Movie[];
  credits: any;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideo(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  async getMovie(id: string) {
    (await this.moviesService.getMovie(id)).subscribe((movie) => {
      this.movie = movie;
    });
  }

  async getSimilarMovies(id: string) {
    (await this.moviesService.getSimilarMovies(id)).subscribe((movie) => {
      this.similarMovies = movie;
    });
  }

  async getMovieVideo(id: string) {
    (await this.moviesService.getMovieVideos(id)).subscribe((movieVideos) => {
      this.movieVideos = movieVideos;
    });
  }

  async getMovieImages(id: string) {
    (await this.moviesService.getMovieImages(id)).subscribe((movie) => {
      this.movieImages = movie;
    });
  }

  async getMovieCredits(id: string) {
    (await this.moviesService.getMovieCredits(id)).subscribe((movie) => {
      this.credits = movie.cast.filter((movie) => movie.profile_path !== null);
      this.movieCredits = this.credits;
    });
  }
}
