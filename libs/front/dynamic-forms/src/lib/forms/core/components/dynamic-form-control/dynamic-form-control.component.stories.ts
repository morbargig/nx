import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DynamicFormControlComponent } from './dynamic-form-control.component';
import { FrontDynamicFormsModule } from '../../../../front-dynamic-forms.module';
import { FormControl, FormGroup } from '@angular/forms';

export default {
  title: 'DynamicFormControlComponent',
  component: DynamicFormControlComponent,
  decorators: [
    moduleMetadata({
      imports: [FrontDynamicFormsModule],
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
  wrapStyleClass: '',
  dynamicControl: {
    type: 'Default',
    field: 'story-book',
    label: 'DynamicFormControlComponent Story Book Demo Label',
    placeholder: 'Placeholder',
  },
  control: new FormControl(),
  parentForm: new FormGroup({}),
};
