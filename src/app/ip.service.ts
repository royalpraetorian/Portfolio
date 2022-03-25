import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http:HttpClient) { }
  public getClientIPAddress()
  {
    return this.http.get("http://api.ipify.org/?format=json");  
  }
}
