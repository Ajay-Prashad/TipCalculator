import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {RootService} from '../root-service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tip-results',
  standalone: true,
  imports: [RouterLink,CommonModule],
  template: `
<p>tip-results works!</p>
  `,
  styleUrl: './tip-results.css'
})
export class TipResults {
  formData: any;
  calculation: { tipAmount: number, total: number };
  serviceQualityLabel: string;
  tipPercentage: number;

}
