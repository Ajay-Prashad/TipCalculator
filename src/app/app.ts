import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Footer} from './footer/footer';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer],
  template: `
    <app-header></app-header>
<router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.css'
})
export class App {
  protected title = 'TipCalculator';
}
