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
  imports: [RouterLink,CommonModule, MatCardModule, MatButtonModule, MatListModule, MatIconModule],
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title class="mat-headline-5">Tip Calculation Results</mat-card-title>
        <mat-card-subtitle>Your bill and tip details</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <mat-list>
          @if (formData.billAmount != null) {
            <mat-list-item>
              <mat-icon matListItemIcon>attach_money</mat-icon>
              <span matListItemTitle>Bill Amount</span>
              <span matListItemLine>{{ formData.billAmount | currency }}</span>
            </mat-list-item>
          }
          @else {
            <mat-list-item>
              <mat-icon matListItemIcon>attach_money</mat-icon>
              <span matListItemTitle>Bill Amount</span>
              <span matListItemLine>Not set</span>
            </mat-list-item>
          }

          @if (formData.serviceQuality) {
            <mat-list-item>
              <mat-icon matListItemIcon>star</mat-icon>
              <span matListItemTitle>Service Quality</span>
              <span matListItemLine>{{ serviceQualityLabel }} ({{ tipPercentage }}%)</span>
            </mat-list-item>
          }
          @else {
            <mat-list-item>
              <mat-icon matListItemIcon>star</mat-icon>
              <span matListItemTitle>Service Quality</span>
              <span matListItemLine>Not set</span>
            </mat-list-item>
          }

          <mat-list-item>
            <mat-icon matListItemIcon>sync</mat-icon>
            <span matListItemTitle>Round Up Tip</span>
            <span matListItemLine>{{ formData.roundUp ? 'Yes' : 'No' }}</span>
          </mat-list-item>

          @if (formData.billAmount != null && formData.serviceQuality) {
            <mat-list-item>
              <mat-icon matListItemIcon>calculate</mat-icon>
              <span matListItemTitle>Tip Amount</span>
              <span matListItemLine>{{ calculation.tipAmount | currency }}</span>
            </mat-list-item>
            <mat-list-item>
              <mat-icon matListItemIcon>account_balance</mat-icon>
              <span matListItemTitle>Total (Bill + Tip)</span>
              <span matListItemLine>{{ calculation.total | currency }}</span>
            </mat-list-item>
          }
        </mat-list>
      </mat-card-content>
      <mat-card-actions>
        <a mat-button routerLink="/input" color="primary">Back to Form</a>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './tip-results.css'
})
export class TipResults {
  formData: any;
  calculation: { tipAmount: number, total: number };
  serviceQualityLabel: string;
  tipPercentage: number;

  constructor(private RootService: RootService) {
    this.formData = this.RootService.getFormData();

    this.serviceQualityLabel = '';
    this.tipPercentage = 0;
    this.calculation = { tipAmount: 0, total: 0 };

    if (this.formData.serviceQuality) {
      switch (this.formData.serviceQuality) {

        case 'okay':
          this.serviceQualityLabel = 'Okay';
          this.tipPercentage = 15;
          break;

        case 'good':
          this.serviceQualityLabel = 'Good';
          this.tipPercentage = 18;
          break;

        case 'excellent':
          this.serviceQualityLabel = 'Excellent';
          this.tipPercentage = 20;
          break;
      }
    }

    if (this.formData.billAmount != null && this.formData.serviceQuality) {
      this.calculation = this.RootService.calculateTip(
        this.formData.billAmount,
        this.formData.serviceQuality,
        this.formData.roundUp
      );
    }
  }
}
