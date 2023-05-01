import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'movies-videos-embed',
  templateUrl: './videos-embed.component.html',
  styleUrls: ['./videos-embed.component.css'],
})
export class VideosEmbedComponent implements OnInit {
  @Input() site: string = 'YouTube';
  @Input() key!: string;
  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    switch (this.site) {
      case 'YouTube':
        this.videoUrl = this.getSafeUrl(
          `https://www.youtube.com/embed/${this.key}`
        );
        break;
      case 'Vimeo':
        this.videoUrl = this.getSafeUrl(
          `https://player.vimeo.com/video/' + ${this.key} + '?h=077b905b65`
        );
        break;
    }
  }
  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
