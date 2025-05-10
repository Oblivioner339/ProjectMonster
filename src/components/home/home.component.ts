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
  showIntro = !localStorage.getItem('introPlayed');

  constructor(private background: BackgroundService) {
    background.cambiaSfondo('sfondoAnimato');
  }

  iniziaGioco(): void {
    this.showIntro = false;
    localStorage.setItem('introPlayed', 'true');
    const audio = document.getElementById('bgmusic') as HTMLAudioElement;
    audio?.play().catch(() => {});
  }

  forzaSplash(): void {
    this.showIntro = true;
    localStorage.removeItem('introPlayed');
  }
}
