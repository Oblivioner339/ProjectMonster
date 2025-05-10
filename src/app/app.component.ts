import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  musicOn: boolean = true;
  started = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const audio = document.getElementById('bgmusic') as HTMLAudioElement;

    const savedVolume = localStorage.getItem("volume");
    const savedMusic = localStorage.getItem("musicOn");

    audio.volume = savedVolume ? parseFloat(savedVolume) : 0.5;


    this.musicOn = savedMusic !== "false";
    if (this.musicOn) audio.play().catch(() => {});
    audio.ontimeupdate = () => {
      localStorage.setItem("musicTime", audio.currentTime.toString());
    };
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      if (url.includes('/battaglia')) {
        this.cambiaMusica('assets/audio/battlemusic.mp3');
      } else {
        this.cambiaMusica('assets/audio/mainmenu.mp3');
      }
    });
  }
  cambiaMusica(path: string) {
    const audio = document.getElementById('bgmusic') as HTMLAudioElement;
    if (!audio || audio.src.includes(path)) return;

    audio.pause();
    audio.src = path;
    audio.load();
    if (this.musicOn) {
      audio.play().catch(() => {});
    }
  }


      toggleMusic(): void {
    const audio = document.getElementById('bgmusic') as HTMLAudioElement;
    this.musicOn = !this.musicOn;
    this.musicOn ? audio.play() : audio.pause();
    localStorage.setItem("musicOn", this.musicOn.toString());
  }

  handleUserInteraction(): void {
    if (!this.started) {
      const audio = document.getElementById('bgmusic') as HTMLAudioElement;
      if (audio && this.musicOn) audio.play().catch(() => {});
      this.started = true;
    }
  }
}
