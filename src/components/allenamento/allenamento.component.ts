import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-allenamento',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './allenamento.component.html',
  styleUrls: []
})
export class AllenamentoComponent {
  nickname: string = ''; // nuovo campo per il nickname

  scegliPokemon(nome: string): void {
    if (!this.nickname.trim()) {
      alert('Inserisci un nickname prima di continuare!');
      return;
    }
    const statPokemon: Record<string, any> = {
      Flamix: {hp: 100, attacco: 10, difesa: 3},
      Grooslime: {hp: 80, attacco: 15, difesa: 5},
      Aquarock: {hp: 90, attacco: 13, difesa: 4}
    };

    const stat = statPokemon[nome];
    localStorage.setItem('nickname', this.nickname); // SALVIAMO il nickname
    localStorage.setItem('nome', nome);
    localStorage.setItem('hp', stat.hp.toString());
    localStorage.setItem('attacco', stat.attacco.toString());
    localStorage.setItem('difesa', stat.difesa.toString());

    location.href = '/battaglia';
  }
}

