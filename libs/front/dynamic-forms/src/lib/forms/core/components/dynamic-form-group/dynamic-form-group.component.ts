import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild,} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {DynamicFormStepMode} from '../../interfaces/dynamic-stepped-form';
import {DynamicFormControl} from '../../interfaces/field-config';

@Component({
  selector: 'fnx-nx-app-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent implements OnInit {
  @ViewChild('submitBtn', {static: false})
  public submitBtn: ElementRef<HTMLButtonElement>;

  @Input() public config: DynamicFormControl[] = [];
  @Input() public mode: DynamicFormStepMode = DynamicFormStepMode.Default;
  @Input() public validation: ValidatorFn[];
  @Input() public errorMessages?: { [error: string]: string };
  @Input() public showSubmitButton?: boolean = true;
  @Input() public showCancelButton?: boolean;
  @Input() template: TemplateRef<any>;
  @Input() public formRowCssClass = '';
  @Input() public formCssClass = '';
  @Input() public submitting?: boolean;
  @Input() public errMsgClass = '';
  @Input() public submitText: string;
  @Input() public cancelText: string;

  @Output() public formOnCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() public formOnSubmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() public formChange: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
  }

  private _form: FormGroup;

  @Input()
  public get form(): FormGroup {
    return this._form;
  }

  public set form(v: FormGroup) {
    this._form = v;
    this.formChange.emit(this._form);
  }

  ngOnInit(): void {
    this.form = this.createGroup();
  }

  public cancel() {
    this.form.reset();
    this.form.markAsPristine();
    this.formOnCancel.emit(true);
  }

  public submit() {
    this.submitBtn?.nativeElement.click();
  }

  public handleSubmit() {
    this.form.updateValueAndValidity();

    if (this.form.valid && !!this.submit) {
      this.formOnSubmit.emit(this.form.getRawValue());
    }
  }

  private createGroup(): FormGroup {
    const group = this.fb.group(
      this.config.reduce((prev, curr) => {
        prev[curr.field] = this.fb.control(curr?.value);
        return prev;
      }, {})
    );
    if (this.validation?.length) {
      group?.setValidators(this.validation);
    }
    return group;
  }
}
