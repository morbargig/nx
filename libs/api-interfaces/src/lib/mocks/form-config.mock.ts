import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';
import { User } from '../api-interfaces';

export const formConfig: DynamicFormControl<User>[] = [
  {
    field: 'job',
    label: 'Job',
    type: 'FormGroup',
    data: {
      formConfig: [
        { field: 'title', label: 'Title', type: 'Default' },
        {
          field: 'salary',
          label: 'Salary',
          type: 'Default',
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
];
