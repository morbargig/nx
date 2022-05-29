import { FormGroup } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormGroupComponent } from './form-group.component';
import { FrontDynamicFormsModule } from '../../../front-dynamic-forms.module';

interface DemoInterface {
  test: {
    component: string;
    type: string;
    rate: number;
  };
}

export default {
  title: 'FormGroupComponent',
  component: FormGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [FrontDynamicFormsModule],
    }),
  ],
} as Meta<FormGroupComponent<DemoInterface>>;

const Template: Story<FormGroupComponent<DemoInterface>> = (
  args: FormGroupComponent<DemoInterface>
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  config: {
    type: 'FormGroup',
    field: 'test',
    label: 'FormTextComponent Story-Book Label',
    placeholder: 'placeholder',
    data: {
      formConfig: [
        {
          field: 'component',
          type: 'Default',
          label: 'Component',
          value: 'FormGroupComponent',
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
          field: 'type',
          type: 'Default',
          value: 'Story-Book',
          label: 'Type',
          placeholder: 'Placeholder',
        },
      ],
    },
  },
  control: new FormGroup({}),
  parentForm: new FormGroup({}) as any,
};
