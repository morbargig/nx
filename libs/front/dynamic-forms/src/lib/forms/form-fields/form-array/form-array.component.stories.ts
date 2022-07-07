import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormArrayComponent } from './form-array.component';
import { FrontDynamicFormsModule } from '../../../front-dynamic-forms.module';
import { FormArray, FormGroup } from '@angular/forms';

interface DemoInterface {
  rates: [
    {
      commenter: string;
      from: string;
      rate: number;
    }
  ];
}

export default {
  title: 'FormArrayComponent',
  component: FormArrayComponent,
  decorators: [
    moduleMetadata({
      imports: [FrontDynamicFormsModule],
    }),
  ],
} as Meta<FormArrayComponent<DemoInterface>>;

const Template: Story<FormArrayComponent<DemoInterface>> = (
  args: FormArrayComponent<DemoInterface>
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  config: {
    type: 'FormArray',
    field: 'rates',
    label: 'FormTextComponent Story-Book Label',
    placeholder: 'placeholder',
    data: {
      formGroupConfig: [
        {
          field: 'commenter',
          type: 'Default',
          label: 'Commenter',
          value: 'Mor Bargig',
          placeholder: 'Placeholder',
        },
        {
          field: 'rate',
          type: 'Default',
          value: 10,
          label: 'Rate',
          placeholder: 'Placeholder',
          data: {
            inputType: 'number',
          },
        },
        {
          field: 'from',
          type: 'Default',
          value: 'Story-Book',
          label: 'From',
          placeholder: 'Placeholder',
        },
      ],
      // inputType: 'number'
    },
  },
  control: new FormArray([]),
  parentForm: new FormGroup({}) as any,
};
