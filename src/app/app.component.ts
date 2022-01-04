import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  videos: any[] = [];
  title = 'Portfolio';
  
  constructor(private youTubeService: YoutubeService) { }

  

  ngOnInit() {

  };
}
