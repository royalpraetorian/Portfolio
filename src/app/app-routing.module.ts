import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MusicpageComponent } from './musicpage/musicpage.component';
import { RecaptchaModule  } from 'ng-recaptcha';
import { BrowserModule } from '@angular/platform-browser';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { WritingpageComponent } from './writingpage/writingpage.component';
import { BooksTabComponent } from './writingpage/books-tab/books-tab.component';
import { GamesTabComponent } from './writingpage/games-tab/games-tab.component';
import { PoetryTabComponent } from './writingpage/poetry-tab/poetry-tab.component';
import { CodepageComponent } from './codepage/codepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'code', component: CodepageComponent},
  { path: 'music', component: MusicpageComponent},
  { path: 'contact', component: ContactpageComponent},
  { path: 'writing', component: WritingpageComponent},
  {path: 'writing/books', component: BooksTabComponent},
  {path: 'writing/poetry', component: PoetryTabComponent},
  {path: 'writing/games', component: GamesTabComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  BrowserModule,
RecaptchaModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
