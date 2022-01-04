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

  constructor() { }

  ngOnInit(): void { }

  public openTab(url: string)
  {
    window.open(url, '_blank')?.focus();
  }

}



