import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';
import { User } from '@fnx-nx/api-interfaces';
import { firstValueFrom, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'fnx-nx-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  constructor(private http: HttpClient) {}
  group = new FormGroup({});
  config: DynamicFormControl<any>[] = [
    {
      type: 'Default',
      field: 'username',
      label: 'UserName',
      placeholder: 'UserName',
    },
    {
      type: 'Default',
      field: 'password',
      label: 'Password',
      placeholder: 'Password',
      // validation: [Validators.required, Validators.maxLength(10)],
      // validation: ['Validators.required'],
      data: { inputType: 'password' },
    },
    {
      type: 'Default',
      field: 'date',
      label: 'Date',
      placeholder: 'Date',
      data: { inputType: 'datetime-local' },
    },
    {
      type: 'Default',
      field: 'description',
      label: 'Description',
      placeholder: 'Description',
      data: { rows: 5 },
    },
  ];

  dy: DynamicFormControl<any> =
    // { DynamicFormConfigurationObject: string, '_': string }
    {
      type: 'Default',
      field: 'DynamicFormConfigurationObject',
      label: 'From Config',
      placeholder: `[{
        type: 'Default',
        field: 'description',
        label: 'Description',
        placeholder: 'Description',
        data: { rows:5 },
      }
    ]`,
      validation: [Validators.required, Validators.minLength(10)],
      errorMessages: {
        required: 'Required',
        minlength: 'minlength',
      },
      data: {
        rows: 5,
      },
    };
  hello$ = this.http.get<DynamicFormControl<User>[]>('/api/helloForm');
  formOnSubmit(event: any) {
    alert(JSON.stringify(event));
  }
  clickServer() {
    firstValueFrom(this.hello$).then((x) => {
      this.config = null;
      firstValueFrom(timer(0)).then(() => {
        this.config = x;
      });
    });
  }
  click() {
    this.config = null;
    firstValueFrom(timer(0)).then(() => {
      this.config = JSON.parse(
        JSON.stringify(
          new Function(
            'return (' +
              this.group.getRawValue().DynamicFormConfigurationObject +
              ')'
          )()
        )
      );
    });
  }
}
