import { Routes } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {OpzioniComponent} from '../components/opzioni/opzioni.component';
import {AllenamentoComponent} from '../components/allenamento/allenamento.component';
import {BattagliaComponent} from '../components/battaglia/battaglia.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'opzioni', component: OpzioniComponent },
  { path: 'allenamento', component: AllenamentoComponent },
  { path: 'battaglia', component: BattagliaComponent },
  { path: '**', redirectTo: '' }
];
