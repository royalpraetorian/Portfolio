import { ChangeDetectorRef, Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
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
  leaderboard: Recommendation[] = [];
  songs?: string[];
  clientIP?: string;
  autocompleteInputTimeout = 500;
  autocompleteInputTimer: any;
  selectedSong?: AutocompleteEntry;
  songSelected: boolean = false;

  constructor(private ngZone: NgZone, requestService: SongrequestService, private ip: IpService, private http: HttpClient) {
    this.formGroup = this.formBuilder.group({
      songName: new FormControl(''),
      requesterName: new FormControl('')
    })
    this.getIP();
    this.getRequests();
  }

  ngOnInit() {
    var sampleData = new SampleData();
    this.filteredOptions = of(sampleData.data);
    this.getIP();
  }

  async onSubmit() {
    if(this.songSelected)
    {
      this.http.post("http://localhost:3000/songrequest/request", {
      "id": this.selectedSong?.id,
      "votes": [
        {"ip": this.clientIP,
      "name": ""+this.formGroup.controls['requesterName'].value}
      ],
      "title": this.selectedSong?.title,
      "artists": this.selectedSong?.artists,
      "artwork": this.selectedSong?.img
    }).subscribe(res => {
      this.getRequests();
    });
    }
    else if(this.selectedSong==undefined)
    {
      console.log("No song selected");
    }
    else
    {
      console.log("Please select a valid song");
    }
  }

  entrySelect(selection: AutocompleteEntry){
    this.songSelected = true;
    this.selectedSong = selection;
    console.log(this.selectedSong);
    console.log("Options: " + this.options.map(option => {return option.title}).join(', '));
    console.log("Song Selected: " + this.songSelected);
    this.formGroup.controls['songName'].updateValueAndValidity({onlySelf: true, emitEvent: true});
  }

  async getRequests(){
    this.leaderboard = await firstValueFrom(this.http.get<Recommendation[]>("http://localhost:3000/songrequest/getAllRequests"));
    console.log(this.leaderboard);
  }

  fieldCLicked(inputField: HTMLInputElement)
  {
    console.log("Field clicked");
    this.selectedSong = undefined;
    this.songSelected = false;
    inputField.value = "";
  }

  unvote(song: Recommendation)
  {
    this.http.post("http://localhost:3000/songrequest/unvote", song).subscribe(res => {
      this.getRequests();
    });
  }

  async vote(song: Recommendation)
  {
    this.http.post("http://localhost:3000/songrequest/request", {
      "id": song?.id,
      "votes": [
        {"ip": this.clientIP,
      "name": ""+this.formGroup.controls['requesterName'].value}
      ],
      "title": song?.title,
      "artists": song?.artists,
      "artwork": song?.artwork
    }).subscribe(res => {
      console.log(res);
      this.getRequests();
    });

    // var response = await firstValueFrom(this.http.post("http://localhost:3000/songrequest/request", {
    //   "id": song?.id,
    //   "votes": [
    //     {"ip": this.clientIP,
    //   "name": ""+this.formGroup.controls['requesterName'].value}
    //   ],
    //   "title": song?.title,
    //   "artists": song?.artists,
    //   "artwork": song?.artwork
    // }));
    // console.log(response);
  }

  voteText(song: Recommendation)
  {
    if(song.votes.length==1)
    {
      return "Vote.";
      // if(song.votes[0]=="")
      // {
      //   return "Vote.  ";
      // }
      // else
      // {
      //   return "Vote, from:  "
      // }
    }
    else
    {
      return "Votes.";
      // if(song.votes.some(vote => { return vote!=""}))
      // {
      //   return "Votes, including:  ";
      // }
      // else
      // {
      //   return "Votes.  ";
      // }
    }
  }

  artistsString(artists: string[]) {
    return artists.join(', ');
  }

  lookupAutocomplete(input: string) {
    this.selectedSong = undefined;
    this.songSelected = false;
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

function autocompleteStringValidator(songSelected: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (songSelected) {
      return null  /* valid option selected */
    }
    return { 'invalidAutocompleteString': { value: control.value } }
  }
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
  public id: string;
  public artists: string[];
  public artwork: string;
  public title: string;
  public voted: boolean;
  public votes: string[];
  public tally: number;

  constructor(id: string, artists: string[], artwork: string, title: string, voted: boolean, votes: string[])
  {
    this.id = id;
    this.artists = artists;
    this.artwork = artwork;
    this.title = title;
    this. voted = voted;
    this.votes = votes;
    this.tally = votes.length;
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
