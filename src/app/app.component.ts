import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title(title: any) {
      throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    const audio = document.getElementById('bgmusic') as HTMLAudioElement;

    const savedVolume = localStorage.getItem("volume");
    const savedMusic = localStorage.getItem("musicOn");
    const savedTime = localStorage.getItem("musicTime");

    audio.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.5;
    if (savedTime !== null) audio.currentTime = parseFloat(savedTime);
    savedMusic === "true" ? audio.play() : audio.pause();

    audio.ontimeupdate = () => {
      localStorage.setItem("musicTime", audio.currentTime.toString());
    };
  }
}
