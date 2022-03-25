import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongrequestService {
  private discogsToken = "scJxtDLRcAiJZZfpJWbdOTllluDISunBRDZOmjwQ";
  private portfolioUsername = "portfolio-admin";
  private portfolioPassword = "poXjyQBrzQMIX9w0";
  private spotifyToken = "BQDD-7CzRB2rrEDxbf94FPbnYmFVxGDQtVBe6OU8hO1lHYbE5EXLRWzyxEwvoHsAJntEiA5sFTy7lVaZ_1B3_yuQzs3eCK9pLH6g3g3N1kqS2YGnPFqtMmDVkxTpGtxTSsHT8k6rY-CHpQ"
  
  constructor(private http: HttpClient) { }

  public spotifySearch(searchString: string)
  {
    searchString = searchString.replace(' ', '%');
  }
}
