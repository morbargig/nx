import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { DynamicFormStepMode } from '../../interfaces/dynamic-stepped-form';
import { DynamicFormControl } from '../../interfaces/field-config';
import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';

@Component({
  selector: 'softbar-app-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent<T = any> implements OnInit {
  @ViewChild('submitBtn', { static: false })
  public submitBtn: ElementRef<HTMLButtonElement>;

  @Input() public config: DynamicFormControl<any>[] = [];
  @Input() public mode: DynamicFormStepMode = DynamicFormStepMode.TableCell;
  @Input() public validation: ValidatorFn[];
  @Input() public errorMessages?: { [error: string]: string };
  @Input() public hideSubmitButton?: boolean;
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

  constructor(private dfb: DynamicFormBuilderService) {}

  private _form: FormGroup;

  public get form(): FormGroup {
    return this._form;
  }

  @Input() public set form(v: FormGroup) {
    this._form = v;
    this.formChange.emit(this._form);
  }

  ngOnInit(): void {
    switch (this.form?.constructor) {
      case FormGroup: {
        break;
      }
      default: {
        this.form = this.createGroup();
        break;
      }
    }
  }

  public cancel() {
    this.form.reset();
    this.form.markAsPristine();
    this.formOnCancel.emit(true);
  }

  // public submit() {
  //   debugger;
  //   this.submitBtn?.nativeElement.click();
  // }

  public handleSubmit() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.formOnSubmit.emit(this.form.getRawValue());
    }
  }

  private createGroup(): FormGroup {
    const group = this.dfb.buildGroup(this.config, {
      validators: this.validation || [],
    });
    return group;
  }
}
