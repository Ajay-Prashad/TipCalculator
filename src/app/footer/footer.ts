import { Component } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  template: `
    <footer>
    <h1 id="text">Ajay Prashad - {{Date | date: 'longDate'}}</h1>
    </footer>
  `,
  styleUrl: './footer.css'
})
export class Footer {
  Date = new Date()
}
