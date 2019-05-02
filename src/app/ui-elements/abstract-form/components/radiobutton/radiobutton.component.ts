import {Component, HostBinding, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormattedFieldConfig} from '../dynamic-form/dynamic-form.component';
import {SelectOptions} from '../../field.interface';
import {isObservable, Observable} from 'rxjs';

@Component({
  selector: 'ui-radiobutton',
  template: `
    <div [formGroup]="group" class="form-group-container" [ngStyle]="{'justify-content': field.alignment}">
      <label class="radio-label-padding">{{field.label}}:</label>
      <mat-radio-group [formControlName]="field.name" class="radio-group">
        <mat-radio-button class="radio-button" *ngFor="let option of this.options" [value]="option">{{option.label}}</mat-radio-button>
      </mat-radio-group>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }

    .radio-group {
      display: flex;
      flex-wrap: nowrap;
    }

    .radio-label-padding {
      padding-right: 1em;
    }

    .radio-button:not(:last-child) {
      padding-right: 1em;
    }

    .form-group-container {
      width: 100%;
      display: flex;
    }
  `]
})
export class RadiobuttonComponent implements OnInit {
  @HostBinding('style.width') hostWidth: string;
  @HostBinding('style.grid-column-end') hostSpan: string;
  field: FormattedFieldConfig;
  group: FormGroup;

  options: SelectOptions[];

  constructor() {
  }

  ngOnInit() {
    this.field.width = this.field.width || '100%';
    this.hostWidth = this.field.rowWidth || '100%';
    this.hostSpan = `span ${this.field.columnSpan || 1}`;
    this.setOptions();
  }

  setOptions() {
    if (!this.isObservable(this.field.options)) {
      this.options = this.field.options as SelectOptions[];
    } else {
      (this.field.options as Observable<SelectOptions[]>).subscribe(options => {
        this.options = options;
      });
    }
  }

  isObservable(val: any): boolean {
    return isObservable(val);
  }
}
