import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-tab',
  templateUrl: './books-tab.component.html',
  styleUrls: ['./books-tab.component.sass']
})
export class BooksTabComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public openTab(url: string)
  {
    window.open(url, '_blank')?.focus();
  }

  public routeTo(route: string)
  {
    this.router.navigateByUrl(route);
  }

}
