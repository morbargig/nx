import { FormGroup, FormControl } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DynamicFormStepMode } from '../../interfaces/dynamic-stepped-form';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';
import { FrontDynamicFormsModule } from '../../../../front-dynamic-forms.module';

interface DemoInterface {
  test: {
    component: string;
    type: string;
    rate: number;
  };
}

export default {
  title: 'DynamicFormGroupComponent',
  component: DynamicFormGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [FrontDynamicFormsModule],
    }),
  ],
} as Meta<DynamicFormGroupComponent<DemoInterface>>;

const Template: Story<DynamicFormGroupComponent<DemoInterface>> = (
  args: DynamicFormGroupComponent<DemoInterface>
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  config: [
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
  mode: DynamicFormStepMode.Default,
  hideSubmitButton: false,
  showCancelButton: true,
  formRowCssClass: '',
  formCssClass: '',
  submitting: false,
  errMsgClass: '',
  submitText: 'Submit',
  cancelText: 'Cancel',
};
