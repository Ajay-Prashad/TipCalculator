import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  private formData: any = {};

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  calculateTip(billAmount: number, serviceQuality: string,
               roundUp: boolean): { tipAmount: number, total: number }

  {

    let tipPercentage: number;

    switch (serviceQuality) {
      case 'okay':
        tipPercentage = 0.15;
        break;
      case 'good':
        tipPercentage = 0.18;
        break;
      case 'excellent':
        tipPercentage = 0.20;
        break;
      default:
        tipPercentage = 0;
    }

    let tipAmount = billAmount * tipPercentage;
    if (roundUp) {
      tipAmount = Math.ceil(tipAmount);
    }

    const total = billAmount + tipAmount;

    return { tipAmount, total };
  }
  constructor() { }
}
