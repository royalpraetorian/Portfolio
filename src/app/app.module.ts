import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButton, MatButtonModule} from '@angular/material/button'; 
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DisplayboxComponent } from './displaybox/displaybox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MusicpageComponent } from './musicpage/musicpage.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { RecaptchaModule } from "ng-recaptcha";
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ContactService } from './contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatCardModule} from '@angular/material/card';
import { WritingpageComponent } from './writingpage/writingpage.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BooksTabComponent } from './writingpage/books-tab/books-tab.component';
import { PoetryTabComponent } from './writingpage/poetry-tab/poetry-tab.component';
import { GamesTabComponent } from './writingpage/games-tab/games-tab.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    HomepageComponent,
    DisplayboxComponent,
    MusicpageComponent,
    ContactpageComponent,
    WritingpageComponent,
    BooksTabComponent,
    PoetryTabComponent,
    GamesTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
    ]),
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    HttpClientModule,
    MatTabsModule,
    RecaptchaModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    NgxSpinnerModule
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
