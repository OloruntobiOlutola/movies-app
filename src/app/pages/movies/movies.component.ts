import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Movie } from 'src/app/models/movies';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'movies-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  genreId!: string;
  value!: string;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByCategory(genreId);
      } else {
        this.getMoviesByPage(1);
      }
    });
  }

  async getMoviesByPage(page: number, value?: string) {
    (await this.moviesService.searchMovies(page, value)).subscribe((res) => {
      console.log(value);
      this.movies = res;
    });
  }

  async getMoviesByCategory(id: string, page?: number) {
    (await this.moviesService.getMoviesByCategory(id, page)).subscribe(
      (res) => {
        this.movies = res;
      }
    );
  }

  onPageChange(event: any) {
    if (this.genreId) {
      this.getMoviesByCategory(this.genreId, event.page + 1);
    } else {
      if (this.value) {
        this.getMoviesByPage(event.page + 1, this.value);
      } else {
        this.getMoviesByPage(event.page + 1);
      }
    }
  }

  valueChanged() {
    if (this.value) {
      this.getMoviesByPage(1, this.value);
    }
  }
}
