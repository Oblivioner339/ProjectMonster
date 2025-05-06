import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-battaglia',
  imports: [CommonModule],
  templateUrl: './battaglia.component.html',
  styleUrls: []
})
export class BattagliaComponent implements OnInit {
  player: any = {};
  enemy: any = {};
  messaggi = '';
  modalAbilita = false;
  nomeAbilita = '';
  descrizioneAbilita = '';

  private readonly statPokemon: any = {
    Flamix: {
      hp: 100, attacco: 10, difesa: 3,
      abilita(thisObj: any) {
        thisObj.enemy.hp -= 15;
        thisObj.log(`${thisObj.nome} usa Fiammata! Infligge 15 danni extra!`);
      },
      nomeAbilita: 'Fiammata',
      descrizioneAbilita: 'Infligge 15 danni extra al nemico.'
    },
    Grooslime: {
      hp: 80, attacco: 15, difesa: 5,
      abilita(thisObj: any) {
        thisObj.hp = Math.min(thisObj.hp + 20, 80);
        thisObj.log(`${thisObj.nome} si rigenera e recupera 20 HP!`);
      },
      nomeAbilita: 'Rigenerazione',
      descrizioneAbilita: 'Recupera 20 HP.'
    },
    Aquarock: {
      hp: 90, attacco: 13, difesa: 4,
      abilita(thisObj: any) {
        thisObj.enemy.difesa = Math.max(0, thisObj.enemy.difesa - 2);
        thisObj.log(`${thisObj.nome} usa Marea! La difesa nemica si abbassa!`);
      },
      nomeAbilita: 'Marea',
      descrizioneAbilita: 'Abbassa la difesa del nemico di 2 punti.'
    }
  };

  ngOnInit(): void {
    const nome = localStorage.getItem('nome')!;
    const nickname = localStorage.getItem('nickname') || 'Tu';
    const hp = parseInt(localStorage.getItem('hp')!, 10);
    const attacco = parseInt(localStorage.getItem('attacco')!, 10);
    const difesa = parseInt(localStorage.getItem('difesa')!, 10);

    const enemyKey = this.getRandomEnemy(nome);
    const statNemico = this.statPokemon[enemyKey];

    this.player = {
      nickname,
      nome,
      hp,
      attacco,
      difesa,
      abilita: this.statPokemon[nome].abilita.bind(null, null), // placeholder, verrà riassegnato sotto
      nomeAbilita: this.statPokemon[nome].nomeAbilita,
      descrizioneAbilita: this.statPokemon[nome].descrizioneAbilita
    };

    this.enemy = {
      nome: enemyKey,
      hp: statNemico.hp,
      attacco: statNemico.attacco,
      difesa: statNemico.difesa,
      abilita: statNemico.abilita.bind(null, null) // idem
    };

// Aggiungiamo le reference dopo
    this.player.enemy = this.enemy;
    this.player.log = (msg: string) => this.messaggi = msg;

// Re-bind corretto ora che i riferimenti sono disponibili
    this.player.abilita = this.statPokemon[nome].abilita.bind(null, this.player);

    this.enemy.enemy = this.player;
    this.enemy.log = (msg: string) => this.messaggi = msg;
    this.enemy.abilita = this.statPokemon[enemyKey].abilita.bind(null, this.enemy);

    this.nomeAbilita = this.player.nomeAbilita;
    this.descrizioneAbilita = this.player.descrizioneAbilita;
  }


  getRandomEnemy(exclude: string): string {
    const keys = Object.keys(this.statPokemon).filter(k => k !== exclude);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  attacca(): void {
    if (this.player.hp <= 0 || this.enemy.hp <= 0) return;

    const critico = Math.random() < 0.1;
    let danno = Math.max(this.player.attacco - this.enemy.difesa, 1);
    if (critico) {
      danno *= 2;
      this.messaggi = `${this.player.nome} fa un COLPO CRITICO! Infligge ${danno} danni a ${this.enemy.nome}!`;
    } else {
      this.messaggi = `${this.player.nome} attacca ${this.enemy.nome} per ${danno} danni!`;
    }
    this.enemy.hp = Math.max(0, this.enemy.hp - danno);

    if (this.enemy.hp <= 0) {
      this.messaggi = `Hai vinto! ${this.enemy.nome} è stato sconfitto!`;
      return;
    }

    setTimeout(() => this.contrattacco(), 1000);
  }

  contrattacco(): void {
    if (Math.random() < 0.3) {
      this.enemy.abilita();
    } else {
      const critico = Math.random() < 0.1;
      let danno = Math.max(this.enemy.attacco - this.player.difesa, 1);
      if (critico) {
        danno *= 2;
        this.messaggi = `${this.enemy.nome} fa un COLPO CRITICO! Infligge ${danno} danni a ${this.player.nome}!`;
      } else {
        this.messaggi = `${this.enemy.nome} contrattacca ${this.player.nome} per ${danno} danni!`;
      }
      this.player.hp = Math.max(0, this.player.hp - danno);
    }

    if (this.player.hp <= 0) {
      this.messaggi = `Sei stato sconfitto da ${this.enemy.nome}...`;
    }
  }

  apriFinestraAbilita(): void {
    this.modalAbilita = true;
  }

  chiudiFinestraAbilita(): void {
    this.modalAbilita = false;
  }

  usaAbilita(): void {
    if (this.player.hp <= 0 || this.enemy.hp <= 0) return;
    this.player.abilita();
    this.chiudiFinestraAbilita();
    setTimeout(() => this.contrattacco(), 1000);
  }
}
