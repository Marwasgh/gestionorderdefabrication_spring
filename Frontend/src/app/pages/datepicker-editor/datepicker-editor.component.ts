import { Component } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'ngx-datepicker-editor',
  template: `
    <div>
      <input
        [(ngModel)]="formattedDate"
        (ngModelChange)="updateValue($event)"
        [ngModelOptions]="{ standalone: true }"
        type="date"
        class="form-control"
        [max]="today"
      />
      <div *ngIf="showError" style="color: red; font-size: 0.8rem; margin-top: 4px;">
        ❌ La date ne peut pas être dans le futur
      </div>
    </div>
  `,
})
export class DatepickerEditorComponent extends DefaultEditor {
  formattedDate: string;
  today: string = new Date().toISOString().split('T')[0]; // yyyy-MM-dd
  showError: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.cell && this.cell.newValue) {
      const date = new Date(this.cell.newValue);
      this.formattedDate = date.toISOString().split('T')[0];
    }
  }

  updateValue(value: string): void {
    const selectedDate = new Date(value);
    const currentDate = new Date(this.today);

    if (selectedDate > currentDate) {
      this.showError = true;
      this.cell.newValue = ''; // optionnel : vider la valeur
    } else {
      this.showError = false;
      this.cell.newValue = value;
    }
  }
}
