import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from '../youtube.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DomSanitizer } from '@angular/platform-browser';
import { SongRequestWidgetComponent } from './song-request-widget/song-request-widget.component';

@Component({
  selector: 'app-musicpage',
  templateUrl: './musicpage.component.html',
  styleUrls: ['./musicpage.component.sass']
})
export class MusicpageComponent implements OnInit {


  private youtubeService: YoutubeService = new YoutubeService(new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() })));
  public videos!: any[];
  private apiLoaded=false;

  public videoWidth: number = 420;
  public videoHeight: number = 290;
  public columns: number = 4;

  constructor() {}

    async ngOnInit() {
    this.resize(window.innerWidth);
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

  onResize(event?: any){

    this.resize(event.target.innerWidth);

  }

  private resize (screenWidth: number)
  {
    if(screenWidth <= 500) { 
      this.columns = 1;
      this.videoWidth = screenWidth*(0.9/this.columns); 
    }
    else if(screenWidth <= 1000) {
      this.columns = 2;
      this.videoWidth = screenWidth*(0.9/this.columns); 
    }
    else if(screenWidth <= 1500) { 
      this.columns = 3;
      this.videoWidth = screenWidth*(0.9/this.columns); 
    }
    else { 
      this.columns = 4; 
      this.videoWidth = screenWidth*(0.9/this.columns); 
    }
    this.updateVideoHeight();
  }

  private updateVideoHeight()
  {
    this.videoHeight = this.videoWidth*0.69047619047;
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
