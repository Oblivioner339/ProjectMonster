import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundService } from '../../services/background.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  showIntro = true;

  constructor(private background: BackgroundService) {
    this.background.cambiaSfondo('sfondoAnimato');
    if (!localStorage.getItem('introPlayed')) {
      this.showIntro = true;
    } else {
      this.showIntro = false;
    }
  }

  iniziaGioco(): void {
    this.showIntro = false;
    localStorage.setItem('introPlayed', 'true');
    const audio = document.getElementById('bgmusic') as HTMLAudioElement;
    if (audio && audio.paused) audio.play().catch(() => {});
  }

  forzaSplash(): void {
    this.showIntro = true;
    localStorage.removeItem('introPlayed');
  }
}
