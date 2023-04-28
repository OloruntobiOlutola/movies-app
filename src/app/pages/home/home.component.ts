import { Component, OnInit } from '@angular/core';
import { Movie, ResponseDTO } from 'src/app/models/movies';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'movies-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularMovies!: Movie[];
  upcomingMovies!: Movie[];
  topRatedMovies!: Movie[];

  constructor(private moviesService: MoviesService) {}
  async ngOnInit(): Promise<void> {
    (await this.moviesService.getMovies('popular')).subscribe((res) => {
      this.popularMovies = res;
    });
    (await this.moviesService.getMovies('upcoming')).subscribe((res) => {
      this.upcomingMovies = res;
    });
    (await this.moviesService.getMovies('top_rated')).subscribe((res) => {
      this.topRatedMovies = res;
    });
  }
}
