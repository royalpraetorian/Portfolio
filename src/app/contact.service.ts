import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

imports: [
  HttpClientModule
]

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api = 'https://mailthis.to/lonelevelsands@gmail.com';
  private apiKey = 'AIzaSyAjN06IOff0BvB1Vvc6ndjKKFnwQd-ZGdc';
  private clientId = 'lonelevelsands@gmail.com';
  private discoveryDocs = "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";


  constructor(private http: HttpClient) { }

  //Look into Cloudmailin https://www.cloudmailin.com/blog/sending_and_receiving_email_in_node_2021

  PostMessage(input: any) {
    let response = this.http.post(this.api, input, { responseType: 'text'});
    console.log(response);
    return response.pipe(
      map(
        (response) => {
          if (response) {
            return response;
          }
          else {
            return;
          }
        },
        (error: any) => {
          return error;
        },
      )
    )
  }

}
