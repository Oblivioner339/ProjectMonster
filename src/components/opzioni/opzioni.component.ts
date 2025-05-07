import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {BackgroundService} from '../../services/background.service';

@Component({
  standalone: true,
  selector: 'app-opzioni',
  imports: [CommonModule, RouterModule],
  templateUrl: './opzioni.component.html',
  styleUrls: ["opzioni.component.css"]
})
export class OpzioniComponent implements OnInit {

  constructor(private background:BackgroundService)
  {
    background.cambiaSfondo('sfondoAnimato');
  }

  ngOnInit(): void {
    const audio = document.getElementById('bgmusic') as HTMLAudioElement;
    const musicaCheckbox = document.getElementById('musica') as HTMLInputElement;
    const volumeSlider = document.getElementById('volume') as HTMLInputElement;

    const savedVolume = localStorage.getItem("volume");
    const savedMusic = localStorage.getItem("musicOn");


    audio.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.5;
    savedMusic === "true" ? audio.play() : audio.pause();


    volumeSlider.value = audio.volume.toString();
    musicaCheckbox.checked = savedMusic === "true";

    volumeSlider.oninput = () => {
      audio.volume = parseFloat(volumeSlider.value);
      localStorage.setItem("volume", volumeSlider.value);
    };

    musicaCheckbox.onchange = () => {
      localStorage.setItem("musicOn", musicaCheckbox.checked.toString());
      musicaCheckbox.checked ? audio.play() : audio.pause();
    };

    audio.ontimeupdate = () => {
      localStorage.setItem("musicTime", audio.currentTime.toString());
    };
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
