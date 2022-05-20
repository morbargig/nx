import { Injectable } from '@nestjs/common';
import { User } from '@fnx-nx/api-interfaces';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';

// let t: User = {
//   age: '324234',
//   name: 'dwedwefew',
//   friends: [
//     {
//       name: 'ad',
//       phoneNumber: 'adc',
//       friends: [
//         {
//           name: 'adc',
//           phoneNumber: 'adsc',
//           friends: [
//             {
//               name: 'cdas',
//               phoneNumber: 'cadsc',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
@Injectable()
export class AppService {
  getHelloFormConf(): DynamicFormControl<User>[] {
    return [
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
      // {
      //   field: 'age',
      //   type: 'Default',
      //   label: 'Age',
      //   placeholder: 'Age',
      //   data: {
      //     inputType: 'number',
      //     // title$: of(),
      //   },
      // },
      // {
      //   field: 'name',
      //   type: 'Default',
      //   label: 'Name',
      //   placeholder: 'Name',
      //   data: {
      //     inputType: 'text',
      //     // title$: of(),
      //   },
      // },
    ];
  }
}
