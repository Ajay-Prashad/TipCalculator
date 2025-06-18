import { Routes } from '@angular/router';
import {TipHome} from './tip-home/tip-home';
import {TipResults} from './tip-results/tip-results';

export const routes: Routes = [
  { path: '',
    component: TipHome},
  {
    path:'home',
    component: TipHome
  },
  {
    path:'tip-results',
    component: TipResults
  }
];
