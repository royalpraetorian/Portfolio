import { Component, NgZone, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../contact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.sass'],
})
export class ContactpageComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  formBuilder = new FormBuilder();
  formGroup!: FormGroup;
  contact!: ContactService;

  constructor(private _ngZone: NgZone, contact: ContactService) {

    this.contact = contact;

   }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    }

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value.';
      }
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      Message: new FormControl('', Validators.required)
    })
  }

  onSubmit(FormData: FormGroup) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm'
    console.log(response)
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })}

}
