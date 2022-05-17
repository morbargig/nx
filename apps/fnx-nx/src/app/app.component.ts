import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';
import { User } from '@fnx-nx/api-interfaces';
import { firstValueFrom } from 'rxjs';

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

@Component({
  selector: 'fnx-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  group = new FormGroup({});
  config: DynamicFormControl<User>[];
  /**
     =  [
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
        data: { rows:5 },
      },
    ]
 */

  dy: DynamicFormControl<any> =
    // { DynamicFormConfigurationObject: string, '_': string }
    {
      type: 'Default',
      field: 'DynamicFormConfigurationObject',
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
      setTimeout(() => {
        this.config = x;
      });
    });
  }
  click() {
    this.config = null;
    setTimeout(() => {
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

  constructor(private http: HttpClient) {
    interface User {
      name: string;
      age: number;
      test: string;
      payment: [{ obj: [{ obj2: [{ obj3: string[][] }] }] }];
    }

    const simpleTest: DynamicFormControl<User>[] = [
      // {
      //   field: 'test',
      //   type: 'Default',
      //   data: {
      //     formControlConfig:
      //       {
      //         type: 'Default',
      //         field: '_'
      //       },
      //   }
      // },
      {
        field: 'payment',
        type: 'FormArray',
        data: {
          formGroupConfig: [
            {
              field: 'obj',
              type: 'FormArray',
              data: {
                formGroupConfig: [
                  {
                    field: 'obj2',
                    type: 'FormArray',
                    data: {
                      formGroupConfig: [
                        {
                          field: 'obj3',
                          type: 'FormArray',
                          validation: [],
                          data: {
                            // formControlConfig: {
                            //   field: '_',
                            //   type: 'Default',
                            // },
                            formArrayConfig: {
                              field: '_',
                              type: 'FormArray',
                              data: {
                                // formGroupConfig: [],
                                // formArrayConfig: [],
                                formControlConfig: {
                                  field: '_',
                                  onChange: () => null,
                                  type: 'Default',
                                  data: {
                                    // formGroupConfig: [],
                                    // formControlConfig: {
                                    //   field: '_',
                                    //   type: 'FormArray',
                                    // },
                                    // formArrayConfig: [],
                                  },
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        field: 'age',
        type: 'Default',
        data: {
          inputType: 'text',
          // title$: of(),
        },
      },
    ];
  }
}

// type LowLetters = Lowercase<'TRsE'>

// const t:LowLetters = 'trse'
