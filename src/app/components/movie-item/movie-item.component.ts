import { Component, Input } from '@angular/core';
import { IMAGE_SIZE_URL } from 'src/app/constants/image-size-url';
import { Movie } from 'src/app/models/movies';

@Component({
  selector: 'movies-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {
  @Input() movie!: Movie;
  imageurl: string = IMAGE_SIZE_URL.medium;
}
