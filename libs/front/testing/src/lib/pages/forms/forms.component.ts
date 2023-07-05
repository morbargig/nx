import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import {
  DynamicFormBuilderService,
  DynamicFormControl,
} from '@fnx-nx/front/dynamic-forms';
import { firstValueFrom, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  job: {
    title: string;
    salary: number;
    coworkers: { name: string; phoneNumber: number }[];
  };
  matrix: string[][];
  roles: string[];
  test: { t: { b: string } };
  name: string;
  age: number;
  friends: {
    name: string;
    phoneNumber: number;
    bestFriend: { name: string; phoneNumber: number };
    friends: {
      name: string;
      phoneNumber: number;
      friends: { name: string; phoneNumber: number }[];
    }[];
  }[];
  // description: string;
  // payment: [{ obj: [{ obj2: [{ obj3: number[][] }] }] }];
}

@Component({
  selector: 'fnx-nx-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private dfb: DynamicFormBuilderService
  ) {}
  @ViewChild('formComponent', { static: false })
  public formComponent: any;
  group = new FormGroup(
    <
      {
        DynamicFormConfigurationObject?: AbstractControl<string>;
        DynamicFormObjectValue?: AbstractControl<string>;
      }
    >{}
  );
  config: DynamicFormControl<User>[];
  /** = [
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
*/
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
  dy2: DynamicFormControl<any> =
    // { DynamicFormConfigurationObject: string, '_': string }
    {
      type: 'Default',
      field: 'DynamicFormObjectValue',
      label: 'Any Valid JSON',
      placeholder: `{
        "job": {
            "title": "Developer",
            "salary": "22",
            "coworkers": [
                {
                    "name": "omri",
                    "phoneNumber": "1"
                },
                {
                    "name": "oren",
                    "phoneNumber": "2"
                }
            ]
        },
        "matrix": [
            [
                "1",
                "2",
                "3",
                null
            ],
            [
                "2",
                "4"
            ]
        ],
        "roles": [
            "10",
            "20",
            "30"
        ],
        "friends": [
            {
                "name": "nik",
                "phoneNumber": "1",
                "friends": [
                    {
                        "name": "zalina",
                        "phoneNumber": "2",
                        "friends": [
                            {
                                "name": "alon",
                                "phoneNumber": "3"
                            },
                            {
                                "name": "anabel",
                                "phoneNumber": "4"
                            }
                        ]
                    },
                    {
                        "name": "ortal",
                        "phoneNumber": "5",
                        "friends": [
                            {
                                "name": "ziv",
                                "phoneNumber": "6"
                            },
                            {
                                "name": "adi",
                                "phoneNumber": "7"
                            }
                        ]
                    }
                ]
            }
        ],
        "age": "24",
        "name": "Mor Bargig"
    }`,
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
      firstValueFrom(timer(0))
        .then(() => {
          this.config = x;
        })
        .catch(() =>
          alert(`something want wrong!
          server is not available at the time`)
        );
    });
  }
  ngOnInit(): void {
    this.config = [
      {
        field: 'job',
        label: 'Job',
        type: 'FormGroup',
        data: {
          formConfig: [
            { field: 'title', label: 'Title' },
            {
              field: 'salary',
              label: 'Salary',
            },
            {
              type: 'FormArray',
              field: 'coworkers',
              label: 'Coworkers',
              data: {
                formGroupConfig: [
                  {
                    type: 'Default',
                    field: 'name',
                    label: 'Name',
                  },
                  {
                    type: 'Default',
                    field: 'phoneNumber',
                    label: 'Phone',
                    data: {
                      inputType: 'tel',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        field: 'matrix',
        type: 'FormArray',
        label: 'Matrix',
        placeholder: 'Matrix',
        data: {
          formArrayConfig: {
            field: '_',
            type: 'FormArray',
            label: 'Matrix',
            placeholder: 'Matrix',
            data: {
              formControlConfig: {
                field: '_',
                type: 'Default',
                label: 'Matrix',
                placeholder: 'Matrix',
              },
            },
          },
        },
      },
      {
        field: 'roles',
        type: 'FormArray',
        label: 'Roles',
        placeholder: 'Roles',
        data: {
          formControlConfig: {
            field: '_',
            type: 'Default',
            label: 'Role',
            placeholder: 'Role',
            data: {
              // inputType: 'number',
              // title$: of(),
            },
          },
        },
      },
      {
        field: 'friends',
        type: 'FormArray',
        // onChange: ({ currentValue }) =>
        //   currentValue[0].friends[0].friends[0].phoneNumber,
        label: 'Friends List',
        data: {
          formGroupConfig: [
            {
              type: 'Default',
              field: 'name',
              label: 'Name',
              // onChange: ({currentValue}) => null,
            },
            {
              type: 'Default',
              field: 'phoneNumber',
              label: 'Phone',
              data: {
                inputType: 'tel',
              },
              // onChange: ({currentValue}) => null,
            },
            {
              type: 'FormArray',
              field: 'friends',
              label: 'Friend Friends List',
              data: {
                formGroupConfig: [
                  {
                    type: 'Default',
                    field: 'name',
                    label: 'Name',
                  },
                  {
                    type: 'Default',
                    field: 'phoneNumber',
                    label: 'Phone',
                    data: {
                      inputType: 'tel',
                    },
                  },
                  {
                    type: 'FormArray',
                    field: 'friends',
                    label: 'Friend Friends List',
                    data: {
                      formGroupConfig: [
                        {
                          type: 'Default',
                          field: 'name',
                          label: 'Name',
                        },
                        {
                          type: 'Default',
                          field: 'phoneNumber',
                          label: 'Phone',
                          data: {
                            inputType: 'tel',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
              // onChange: ({currentValue}) => null,
            },
          ],
        },
      },
      {
        field: 'age',
        type: 'Default',
        label: 'Age',
        placeholder: 'Age',
        data: {
          inputType: 'number',
          // title$: of(),
        },
      },
      {
        field: 'name',
        type: 'Default',
        label: 'Name',
        placeholder: 'Name',
        data: {
          inputType: 'text',
          // title$: of(),
        },
      },
    ] as any;
    // console.log(this.config);
    // console.log([
    //   {
    //     type: 'Default',
    //     field: 'username',
    //     label: 'UserName',
    //     placeholder: 'UserName',
    //   },
    //   {
    //     type: 'Default',
    //     field: 'password',
    //     label: 'Password',
    //     placeholder: 'Password',
    //     // validation: [Validators.required, Validators.maxLength(10)],
    //     // validation: ['Validators.required'],
    //     data: { inputType: 'password' },
    //   },
    //   {
    //     type: 'Default',
    //     field: 'date',
    //     label: 'Date',
    //     placeholder: 'Date',
    //     data: { inputType: 'datetime-local' },
    //   },
    //   {
    //     type: 'Default',
    //     field: 'description',
    //     label: 'Description',
    //     placeholder: 'Description',
    //     data: { rows: 5 },
    //   },
    // ]);
    // firstValueFrom(this.hello$).then((x) => {
    //   this.config = x;
    //   // console.log(this.dfb.recursionBuildForm(x[0]));
    // });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
  click2() {
    this.config = null;
    firstValueFrom(timer(0)).then(() => {
      this.config = this.dfb.fromJsonToConfigRecursion(
        JSON.parse(
          JSON.stringify(
            new Function(
              'return (' + this.group.getRawValue().DynamicFormObjectValue + ')'
            )()
          )
        )
      ) as any;
      console.log('config:', this.config);
    });
  }
}
