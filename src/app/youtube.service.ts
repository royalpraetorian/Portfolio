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

  constructor(public http: HttpClient) { }

  public async getVideosFromPlaylist() {
    return await axios("http://34.125.165.183:3000/youtube/getPlaylistVideos");
    // return await axios("http://localhost:3000/youtube/getPlaylistVideos");
  }
}
