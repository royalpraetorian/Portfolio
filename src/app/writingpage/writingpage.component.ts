import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-writingpage',
  templateUrl: './writingpage.component.html',
  styleUrls: ['./writingpage.component.sass']
})
export class WritingpageComponent implements OnInit {

  public columns: number = 4;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.resize(window.innerWidth)
  }

  onResize(event?: any){

    this.resize(event.target.innerWidth);

  }

  public routeTo(route: string)
  {
    this.router.navigateByUrl(route);
  }

  private resize (screenWidth: number)
  {
    if(screenWidth <= 500) { this.columns = 1; }
    else if(screenWidth <= 1000) {this.columns = 2; }
    else if(screenWidth <= 1500) { this.columns = 3; }
    else { this.columns = 3; }
  }

}
