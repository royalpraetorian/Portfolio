import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';
import $ from "jquery";
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey : string = 'AIzaSyAjN06IOff0BvB1Vvc6ndjKKFnwQd-ZGdc';

  constructor(public http: HttpClient) { }

  public async getVideosFromPlaylist() {
    return await axios("http://34.125.165.183:3000/youtube/getPlaylistVideos");
  }
}
