import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MusicpageComponent } from './musicpage/musicpage.component';
import { RecaptchaModule  } from 'ng-recaptcha';
import { BrowserModule } from '@angular/platform-browser';
import { ContactpageComponent } from './contactpage/contactpage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'music', component: MusicpageComponent},
  { path: 'contact', component: ContactpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  BrowserModule,
RecaptchaModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
