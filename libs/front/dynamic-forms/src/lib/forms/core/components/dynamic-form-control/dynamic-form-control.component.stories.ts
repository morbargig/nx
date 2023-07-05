import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DynamicFormControlComponent } from './dynamic-form-control.component';
import { FormControl, FormGroup } from '@angular/forms';

export default {
  title: 'DynamicFormControlComponent',
  component: DynamicFormControlComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<DynamicFormControlComponent>;

const Template: Story<DynamicFormControlComponent> = (
  args: DynamicFormControlComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  isRequired: false,
  hideLabel: false,
  dynamicControl: {
    type: 'Default',
    field: 'story-book',
    label: 'DynamicFormControlComponent Story Book Demo Label',
    placeholder: 'Placeholder',
  },
  control: new FormControl(),
  parentForm: new FormGroup({}),
};
