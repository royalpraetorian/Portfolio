import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  public birthdate = new Date("1996-06-12");
  public difference = Math.abs(Date.now() - this.birthdate.getTime());
  public birthMili = this.birthdate.getTime();
  public age: number = Math.floor((this.difference / (1000 * 3600 * 24))/365);
  //resizing variables
  public columns: number = 4;


  constructor() { }

  ngOnInit(): void { 

    this.resize(window.innerWidth);

  }

  onResize(event?: any){

    this.resize(event.target.innerWidth);

  }

  private resize (screenWidth: number)
  {
    if(screenWidth <= 500) { this.columns = 1; }
    else if(screenWidth <= 1000) {this.columns = 2; }
    else if(screenWidth <= 1500) { this.columns = 3; }
    else { this.columns = 4; }
  }

  public openTab(url: string)
  {
    window.open(url, '_blank')?.focus();
  }

}



