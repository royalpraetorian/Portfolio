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
  submitted: boolean = false;
  isLoading: boolean = false;
  responseMessage!: string;

  constructor(private _ngZone: NgZone, private http: HttpClient) {
    this.formGroup = this.formBuilder.group({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      Message: new FormControl('', Validators.required)
    })

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
  }

  onSubmit() {
    if(this.formGroup.status == "VALID")
    {
      this.formGroup.disable();
      var formData: any = new FormData();
      formData.append("name", this.formGroup.get("Name")?.value);
      formData.append("email", this.formGroup.get("Email")?.value);
      formData.append("message", this.formGroup.get("Message")?.value);
      this.isLoading = true;
      this.submitted = false;
      this.http.post("https://script.google.com/macros/s/AKfycbyUQVEmBhM5rdLso1a2iA7Xft1ZM5CHDjSaR1qwffo6PJvcE4py-1Ff-5zimIFB3l35EA/exec", formData).subscribe(
        (response: any) => {
          if(response.result == "success") {
            this.responseMessage = "Lovely to hear from you, friend.";
          }
          else {
            this.responseMessage = "Oh dear, something wasn't quite right. Reload the page (F5) and try again.";
          }
          this.formGroup.enable();
          this.submitted = true;
          this.isLoading = false;
        },
        (error: any) => {
          this.responseMessage = "There was an error, reload the page (F5) and try again.";
          this.formGroup.enable;
          this.submitted = true;
          this.isLoading = false;
        }
      )
    }
  }

}
