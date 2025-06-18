import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {RootService} from '../root-service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title class="mat-headline-5">Tip Calculator</mat-card-title>
        <mat-card-subtitle>Enter your bill details</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="tipForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Bill Amount ($)</mat-label>
            <input matInput type="number" formControlName="billAmount" placeholder="Enter bill amount">
            <mat-icon matSuffix>attach_money</mat-icon>
            @if (tipForm.get('billAmount')?.hasError('required')) {
              <mat-error>Bill amount is required</mat-error>
            }
            @if (tipForm.get('billAmount')?.hasError('min')) {
              <mat-error>Bill amount must be non-negative</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Service Quality</mat-label>
            <mat-select formControlName="serviceQuality" placeholder="Select service quality">
              <mat-option value="okay">Okay (15%)</mat-option>
              <mat-option value="good">Good (18%)</mat-option>
              <mat-option value="excellent">Excellent (20%)</mat-option>
            </mat-select>
            @if (tipForm.get('serviceQuality')?.hasError('required')) {
              <mat-error>Please select service quality</mat-error>
            }
          </mat-form-field>

          <mat-slide-toggle formControlName="roundUp" color="primary">
            Round up tip to nearest dollar
          </mat-slide-toggle>

          <mat-card-actions>
            <button mat-raised-button color="primary" type="submit" [disabled]="!tipForm.valid">
              Calculate Tip
            </button>
          </mat-card-actions>
        </form>
      </mat-card-content>
    </mat-card>

    <div class="navigation">
      <a mat-button routerLink="/output" color="accent">View Results</a>
    </div>
  `,
  styleUrl: './tip-home.css'
})
export class TipHome {
  tipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private RootService: RootService
  ) {
    this.tipForm = this.fb.group({
      billAmount: [null, [Validators.required, Validators.min(0)]],
      serviceQuality: ['', Validators.required],
      roundUp: [false]
    });
  }

  onSubmit() {
    if (this.tipForm.valid) {
      this.RootService.setFormData(this.tipForm.value);
      this.router.navigate(['/tip-results']);
    }
  }
}
