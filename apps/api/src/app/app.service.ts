import { Injectable } from '@nestjs/common';
import { User } from '@fnx-nx/api-interfaces';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';

@Injectable()
export class AppService {
  getHelloFormConf(): DynamicFormControl<User>[] {
    return [
      // {
      //   field: 'test',
      //   type: 'FormArray',
      //   bodyStyle: {},
      //   data: {
      //     formControlConfig: {
      //       type: 'Default',
      //       field: '_',
      //       // onChange: ({currentValue}) => null,
      //     },
      //   },
      // },
      // {
      //   field: 'payment',
      //   type: 'FormArray',
      //   data: {
      //     formGroupConfig: [
      //       {
      //         field: 'obj',
      //         type: 'FormArray',
      //         data: {
      //           formGroupConfig: [
      //             {
      //               field: 'obj2',
      //               type: 'FormArray',
      //               data: {
      //                 formGroupConfig: [
      //                   {
      //                     field: 'obj3',
      //                     type: 'FormArray',
      //                     validation: [],
      //                     data: {
      //                       // formControlConfig: {
      //                       //   field: '_',
      //                       //   type: 'Default',
      //                       // },
      //                       formArrayConfig: {
      //                         field: '_',
      //                         type: 'FormArray',
      //                         data: {
      //                           // formGroupConfig: [],
      //                           // formArrayConfig: [],
      //                           formControlConfig: {
      //                             field: '_',
      //                             // onChange: ({currentValue}) => null,
      //                             type: 'Default',
      //                             data: {
      //                               // formGroupConfig: [],
      //                               // formControlConfig: {
      //                               //   field: '_',
      //                               //   type: 'FormArray',
      //                               // },
      //                               // formArrayConfig: [],
      //                             },
      //                           },
      //                         },
      //                       },
      //                     },
      //                   },
      //                 ],
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     ],
      //   },
      // },
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
