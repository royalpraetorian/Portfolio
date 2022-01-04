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

  public getVideosForChannel(channel: string, maxResults: number): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  public async getVideosFromPlaylist(playlist: string, maxResults: number) {
    return await axios('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+ maxResults +'&playlistId='+ playlist + '&key='+this.apiKey);
  }
}
