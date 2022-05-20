import { Injectable } from '@nestjs/common';
import { User } from '@fnx-nx/api-interfaces';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';

@Injectable()
export class AppService {
  getHelloFormConf(): DynamicFormControl<User>[] {
    return [
      {
        field: 'job',
        label: 'Label',
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
            field: '___' as any,
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
            label: 'Age',
            placeholder: 'Age',
            data: {
              inputType: 'number',
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
    ];
  }
}
