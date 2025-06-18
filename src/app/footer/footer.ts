import { Component } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  template: `
    <h1>Ajay Prashad - {{Date | date: 'longDate'}}</h1>

  `,
  styleUrl: './footer.css'
})
export class Footer {
  Date = new Date()
}
