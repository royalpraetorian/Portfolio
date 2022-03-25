import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { SongrequestService } from 'src/app/songrequest.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firstValueFrom, Observable } from 'rxjs';
import { NgMarqueeComponent } from 'ng-marquee-improved';
import { map, startWith } from 'rxjs/operators';
import { NgMarqueeModule } from 'ng-marquee-improved';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IpService } from 'src/app/ip.service';
import { ThisReceiver } from '@angular/compiler';
import { MAT_OPTION_PARENT_COMPONENT } from '@angular/material/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-song-request-widget',
  templateUrl: './song-request-widget.component.html',
  styleUrls: ['./song-request-widget.component.sass']
})
export class SongRequestWidgetComponent implements OnInit {
  control = new FormControl();
  formBuilder = new FormBuilder();
  formGroup!: FormGroup;
  options: AutocompleteEntry[] = [];
  filteredOptions?: Observable<AutocompleteEntry[]>;
  leaderboard: Map<string, Recommendation> = new Map<string, Recommendation>();
  songs?: string[];
  clientIP?: string;
  autocompleteInputTimeout = 500;
  autocompleteInputTimer: any;
  selectedSong?: AutocompleteEntry;

  constructor(private ngZone: NgZone, requestService: SongrequestService, private ip: IpService, private http: HttpClient) {
    this.formGroup = this.formBuilder.group({
      songName: new FormControl('', [Validators.required, autocompleteStringValidator(this.options.map(option => option.title))]),
      requesterName: new FormControl('')
    })
    this.getIP();
    this.songs = Array.from(this.leaderboard.keys());
  }

  ngOnInit() {
    var sampleData = new SampleData();
    this.filteredOptions = of(sampleData.data);
    this.getIP();
  }

  onSubmit() {

  }

  entrySelect(selection: AutocompleteEntry){
    this.selectedSong = selection;
    console.log(this.selectedSong);
  }

  artistsString(artists: string[]) {
    return artists.join(', ');
  }

  lookupAutocomplete(input: string) {
    console.log('Timer Started');
    clearTimeout(this.autocompleteInputTimer);
    if (input != "") {
      this.ngZone.run(() => {this.autocompleteInputTimer = setTimeout(async () => {
        console.log('Lookup started');
        this.options = await firstValueFrom(this.http.get<AutocompleteEntry[]>(`http://localhost:3000/songrequest/autofill?title=${input}`));
        console.log(this.options);
        this.filteredOptions = of(this.options);
        console.log(this.filteredOptions);
      }, this.autocompleteInputTimeout)});
    }

  }


  private getIP() {
    this.ip.getClientIPAddress().subscribe((res: any) => {
      this.clientIP = res.ip;
    });
  }

  private _filter(value: string): AutocompleteEntry[] {
    console.log("Filtering.");
    var retVal = this.ngZone.run(() => 
    {
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.title.toLowerCase().includes(filterValue))
  });

  console.log("Filtered List: " + retVal);
  return retVal;
  }
}

function autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.indexOf(control.value) !== -1) {
      return null  /* valid option selected */
    }
    return { 'invalidAutocompleteString': { value: control.value } }
  }
}

function getRequests() {

}

class AutocompleteEntry {
  public title: string;
  public artists: string[];
  public popularity: number;
  public album: string;
  public img: string;
  public id: string;

  constructor(id: string, title: string, artists: string[], album: string, img: string, popularity: number = 0) {
    this.title = title;
    this.id = id;
    this.artists = artists;
    this.album = album;
    this.popularity = popularity;
    this.img = img;
  }
}

class Recommendation {
  public title?: string;
  public id?: string;
  public votes?: string[];
  public voted?: boolean;
  public tally?: number;

  constructor(name: string, voterNames: string[], tally: number) {
    this.title = name;
    this.tally = tally;
    this.votes = voterNames;
  }
}

class SampleData {
  public data: AutocompleteEntry[] = <AutocompleteEntry[]>[
    {
        title: "Wonderwall - Remastered",
        popularity: 81,
        id: "7ygpwy2qP3NbrxVkHvUhXY",
        artists: [
            "Oasis"
        ],
        album: "(What's The Story) Morning Glory? (Deluxe Remastered Edition)",
        img: "https://i.scdn.co/image/ab67616d000048517a4c8c59851c88f6794c3cbf"
    },
    {
        title: "Wonderwall",
        popularity: 74,
        id: "1qPbGZqppFwLwcBC1JQ6Vr",
        artists: [
            "Oasis"
        ],
        album: "(What's The Story) Morning Glory?",
        img: "https://i.scdn.co/image/ab67616d000048512f2eeee9b405f4d00428d84c"
    },
    {
        title: "Wonderwall",
        popularity: 66,
        id: "4sigEqg7SMeZsn8haXoloU",
        artists: [
            "TEEMID"
        ],
        album: "Wonderwall",
        img: "https://i.scdn.co/image/ab67616d00004851bddacd834aef0b78006eb0db"
    },
    {
        title: "Wonderwall",
        popularity: 65,
        id: "4siFdX3QLfjtzg1HHgCPW7",
        artists: [
            "Ryan Adams"
        ],
        album: "Love Is Hell",
        img: "https://i.scdn.co/image/ab67616d00004851676d3a3faeade0793aae38a5"
    },
    {
        title: "Wonderwall - Live from Spotify Sessions, Metropolis Studios, London",
        popularity: 60,
        id: "3EfTQn30P4fqXxRf9IN7x6",
        artists: [
            "Liam Gallagher"
        ],
        album: "Spotify Singles",
        img: "https://i.scdn.co/image/ab67616d000048511eddbe98cfd5e40d9b3810ff"
    },
    {
        title: "Wonderwall",
        popularity: 59,
        id: "5YO7hivGzpGctGedUVRmFv",
        artists: [
            "Regina Scallí"
        ],
        album: "Wonderwall",
        img: "https://i.scdn.co/image/ab67616d00004851de25474cf575b20f4b61f2f5"
    },
    {
        title: "Wonderwall",
        popularity: 58,
        id: "3xJEu7OdZcjeX8iX3pvODL",
        artists: [
            "Lucky Luke"
        ],
        album: "Wonderwall",
        img: "https://i.scdn.co/image/ab67616d00004851acddaab0da78f6e4d112ab9c"
    },
    {
        title: "There Is No Wonderwall",
        popularity: 56,
        id: "6oDYIYQKJZqOSm3Xwd2cBC",
        artists: [
            "Sylow",
            "Pierre Leck",
            "Kingsley Q"
        ],
        album: "There Is No Wonderwall",
        img: "https://i.scdn.co/image/ab67616d00004851bf3303ab41cd368c2d8f9986"
    },
    {
        title: "Wonderwall (2008)",
        popularity: 55,
        id: "7jFHJJdfmEM4hBdPxZ1M5B",
        artists: [
            "Boyce Avenue"
        ],
        album: "Cover Sessions, Vol. 1",
        img: "https://i.scdn.co/image/ab67616d000048514b84680af4ad6c38e1e808f5"
    },
    {
        title: "Wonderwall",
        popularity: 53,
        id: "4UXuAPLZvfbAKjRoTXfxQc",
        artists: [
            "Lofi Fruits Music",
            "Chill Fruits Music"
        ],
        album: "90s Oldschool Lofi Hip Hop",
        img: "https://i.scdn.co/image/ab67616d00004851d773899f4b2dcf3b1372fcaa"
    },
    {
        title: "Wonderwall",
        popularity: 50,
        id: "79J0PGII53YzA3AGNe2AmJ",
        artists: [
            "Deeply Dip",
            "Crystal Rock",
            "Marc Kiss",
            "Lazorra"
        ],
        album: "Wonderwall",
        img: "https://i.scdn.co/image/ab67616d0000485104afc4c307e77dc1a676bb42"
    },
    {
        title: "Wonderwall",
        popularity: 49,
        id: "4ghr0Ume8Cc3ytNBFvZTV9",
        artists: [
            "Lance Allen"
        ],
        album: "Wonderwall",
        img: "https://i.scdn.co/image/ab67616d0000485151370f000e23822964a59c82"
    },
    {
        title: "Wonderwall - Piano Version",
        popularity: 49,
        id: "6sTS2O7ofQkAcEXQIBSi78",
        artists: [
            "Henry Smith"
        ],
        album: "90s Piano Covers",
        img: "https://i.scdn.co/image/ab67616d0000485199b46bdfdef9f20cd983aa65"
    },
    {
        title: "Wonderwall - Blink-182 Style",
        popularity: 47,
        id: "0wcmB6mkNfqxSWew8ETKXP",
        artists: [
            "Alex Melton"
        ],
        album: "Wonderwall (Blink-182 Style)",
        img: "https://i.scdn.co/image/ab67616d0000485163ecaf3555f4544be186159c"
    },
    {
        title: "Wonderwall (Piano Arrangement)",
        popularity: 45,
        id: "7fwcHUJnsO3Rwj8VQ1Kfs8",
        artists: [
            "The Theorist"
        ],
        album: "Wonderwall (Piano Arrangement)",
        img: "https://i.scdn.co/image/ab67616d00004851bcc2fa3ee4836fb705d66dda"
    },
    {
        title: "Wonderwall",
        popularity: 44,
        id: "3SN6V2ZELXrTjna8TRXJ1l",
        artists: [
            "Cartel"
        ],
        album: "Punk Goes 90's",
        img: "https://i.scdn.co/image/ab67616d00004851bc746517d62ecf5e615f506b"
    },
    {
        title: "Wonderwall",
        popularity: 44,
        id: "3N7wclRSF2D2RT3O27LEOE",
        artists: [
            "Zella Day"
        ],
        album: "When We Rise (Original Television Soundtrack)",
        img: "https://i.scdn.co/image/ab67616d00004851289dc2c9dd6b2721291f1470"
    },
    {
        title: "Wonderwall",
        popularity: 44,
        id: "5s31qYmaTFh4UVovj4K4LO",
        artists: [
            "Lofi Fruits Music",
            "Chill Fruits Music"
        ],
        album: "Lofi Fruits Music",
        img: "https://i.scdn.co/image/ab67616d00004851224891badd88dbd4882ced43"
    },
    {
        title: "Wonderwall - Lullaby Version",
        popularity: 42,
        id: "329ZyZKf60aOArjoqicHnd",
        artists: [
            "Baby Music from I'm In Records"
        ],
        album: "Lullaby Renditions of Oasis",
        img: "https://i.scdn.co/image/ab67616d00004851ad317add6eb5915b0d22ad2d"
    },
    {
        title: "Wonderwall",
        popularity: 0,
        id: "5Z344oRA9cSohrBRHYXHhc",
        artists: [
            "Ryan Adams"
        ],
        album: "Pure Acoustic 2022",
        img: "https://i.scdn.co/image/ab67616d00004851964e84eaa43dd6004d1671d2"
    }
]
}
