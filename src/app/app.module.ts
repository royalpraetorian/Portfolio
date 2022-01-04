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

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    HomepageComponent,
    DisplayboxComponent,
    MusicpageComponent,
    ContactpageComponent
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
    RecaptchaModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
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
