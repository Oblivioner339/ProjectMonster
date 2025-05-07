import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService
{



  backgroundOptions = {
    margin: '0',
    padding: '0',
    fontFamily: "'Cinzel', serif",
    background: "url('https://www.transparenttextures.com/patterns/dark-mosaic.png'), radial-gradient(ellipse at center, #0f0c29, #302b63, #24243e)",
    backgroundSize: 'cover',
    animation: 'backgroundMove 60s linear infinite'
  };

  //per avere un altro sfondo modifica quello qu sotto
  background2 = {
    margin: '0',
    padding: '0',
    fontFamily: "'Cinzel', serif",
    background: "url('/assets/img/battle-background.jpg'), radial-gradient(ellipse at center, #0f0c29, #302b63, #24243e)",
    backgroundSize: 'cover',

  };
  cambiaSfondo(nomeSfondo:string)
  {
    let body = document.getElementById('pagina');
    let css ;
    switch (nomeSfondo)
    {
      case 'sfondoAnimato':
        css=this.backgroundOptions;
        break;
      case 'battaglia':
        css=this.background2;
        break;

      default:css=this.backgroundOptions;
    }

    for (const [key, value] of Object.entries(css!)) {
      (body!.style as any)[key] = value;
    }
  }
}
