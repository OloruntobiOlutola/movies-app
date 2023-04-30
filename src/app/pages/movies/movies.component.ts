import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movies';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'movies-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMoviesByPage(1);
  }

  async getMoviesByPage(page: number) {
    (await this.moviesService.searchMovies(page)).subscribe((res) => {
      this.movies = res;
    });
  }

  onPageChange(event: any) {
    this.getMoviesByPage(event.page + 1);
  }
}
