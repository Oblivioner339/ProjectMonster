import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundService } from '../../services/background.service';
import { AppComponent} from '../../app/app.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  showPrologo = false;
  showIntro = false;
  showMenu = false;
  prologoFinito = false; // <-- nuova proprietà

  constructor(private background: BackgroundService) {
    this.background.cambiaSfondo('sfondoAnimato');

    const introPlayed = localStorage.getItem('introPlayed');
    const prologoPlayed = localStorage.getItem('prologoPlayed');

    if (!prologoPlayed) {
      this.showPrologo = true;
    } else if (!introPlayed) {
      this.showIntro = true;
    } else {
      this.showMenu = true;
    }
  }

  onPrologoFinito(): void {
    this.fermaMusicaPrologo();
    this.prologoFinito = true;

    // Dopo la dissolvenza, mostra la splash con effetto fade-in
    setTimeout(() => {
      this.showPrologo = false;
      this.showIntro = true;

      setTimeout(() => {
        const splash = document.querySelector('.intro-screen');
        splash?.classList.add('fade-in');

        const image = splash?.querySelector('img');
        image?.classList.add('fade-in-image');
      }, 50);


      this.prologoFinito = false;
      localStorage.setItem('prologoPlayed', 'true');
    }, 2000);
  }


  iniziaGioco(): void {
    this.fermaMusicaPrologo(); // ← spegne eventuale musica prologo
    this.showIntro = false;
    this.showMenu = true;
    localStorage.setItem('introPlayed', 'true');

    // La musica parte da sola grazie ad autoplay, ma se vuoi forzarla:
    setTimeout(() => {
      const audio = document.getElementById('bgmusic') as HTMLAudioElement;
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    }, 100); // leggero delay per sicurezza caricamento
  }


  forzaSplash(): void {
    this.showPrologo = false;
    this.showIntro = true;
    this.showMenu = false;
    localStorage.removeItem('introPlayed');
  }

  forzaPrologo(): void {
    this.showPrologo = true;
    this.showIntro = false;
    this.showMenu = false;
    this
    localStorage.removeItem('introPlayed');
    localStorage.removeItem('prologoPlayed');

    // Ferma bgmusic
    const bg = document.getElementById('bgmusic') as HTMLAudioElement;
    if (bg) {
      bg.pause();
      bg.currentTime = 0;
    }

    const audio = document.getElementById('prologomusic') as HTMLAudioElement;
    if (audio) audio.play().catch(() => {});
  }


  skipPrologo(): void {
    this.onPrologoFinito();

  }

  fermaMusicaPrologo(): void {
    const audio = document.getElementById('prologomusic') as HTMLAudioElement;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

}


