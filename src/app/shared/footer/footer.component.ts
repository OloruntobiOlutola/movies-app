import { Component } from '@angular/core';

@Component({
  selector: 'movies-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year: number = new Date().getFullYear();
}
