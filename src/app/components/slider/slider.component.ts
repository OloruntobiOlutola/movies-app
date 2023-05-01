import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movies';

@Component({
  selector: 'movies-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate('1s')]),
      transition('* => void', [animate('500ms')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input() movies!: Movie[];
  @Input() isBanner: boolean = false;
  currentSliderIndex: number = 0;
  currentIndex: number = 0;

  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.currentSliderIndex++;
        this.currentIndex = this.currentSliderIndex % this.movies.length;
      }, 5000);
    }
  }
}
