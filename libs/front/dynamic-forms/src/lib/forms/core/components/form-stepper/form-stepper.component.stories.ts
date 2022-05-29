import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormStepperComponent } from './form-stepper.component';

export default {
  title: 'FormStepperComponent',
  component: FormStepperComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<FormStepperComponent>;

const Template: Story<FormStepperComponent> = (args: FormStepperComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    activeClass:  'active',
    inactiveClass:  '',
    bodyClass:  '',
}