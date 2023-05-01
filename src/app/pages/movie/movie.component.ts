import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGE_SIZE_URL } from 'src/app/constants/image-size-url';
import {
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
export class MovieComponent implements OnInit {
  movie!: MovieDetailDto;
  imageurl: string = IMAGE_SIZE_URL.medium;
  largeUrl: string = IMAGE_SIZE_URL.large;
  movieVideos!: MovieVideoDto[];
  movieImages!: MovieImages;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideo(id);
      this.getMovieImages(id);
    });
  }

  async getMovie(id: string) {
    (await this.moviesService.getMovie(id)).subscribe((movie) => {
      this.movie = movie;
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
}
