import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-tab',
  templateUrl: './books-tab.component.html',
  styleUrls: ['./books-tab.component.sass']
})
export class BooksTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public openTab(url: string)
  {
    window.open(url, '_blank')?.focus();
  }

}
