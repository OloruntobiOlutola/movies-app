import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movies';

@Component({
  selector: 'movies-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.css'],
})
export class ItemsBannerComponent {
  @Input() movies!: Movie[];
  @Input() title: string = '';
}
