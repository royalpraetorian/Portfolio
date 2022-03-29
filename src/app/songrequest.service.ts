import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongrequestService {
  
  
  constructor(private http: HttpClient) { }

  public spotifySearch(searchString: string)
  {
    searchString = searchString.replace(' ', '%');
  }
}
