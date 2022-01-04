import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from '../youtube.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-musicpage',
  templateUrl: './musicpage.component.html',
  styleUrls: ['./musicpage.component.sass']
})
export class MusicpageComponent implements OnInit {


  private youtubeService: YoutubeService = new YoutubeService(new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() })));
  public videos!: any[];
  private apiLoaded=false;
  constructor() {}

    async ngOnInit() {
    if (!this.apiLoaded) {
      const tag  = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded=true;
    }
    let response = await this.youtubeService.getVideosFromPlaylist('PLQdvZmDLepiAl4fbNqwFRKVfcdlSl9oq4', 50);
    this.videos = response.data.items;
    console.log(this.videos);
  }

  public getEmbed(videoID: string)
  {
    
  }

  public openYoutubeLink(videoID: string)
  {
    let url = "https://www.youtube.com/watch?v=" + videoID;
    this.openTab(url);
  }

  public openTab(url: string)
  {
    window.open(url, '_blank')?.focus();
  }
}
