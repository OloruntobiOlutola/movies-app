import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genres';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'movies-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent implements OnInit {
  genres!: Genre[];

  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.getGenres();
  }

  async getGenres() {
    (await this.moviesService.getMovieGenres()).subscribe((genresData) => {
      this.genres = genresData;
    });
  }
}
