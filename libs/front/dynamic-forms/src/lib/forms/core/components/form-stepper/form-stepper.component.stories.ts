import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormStepperComponent } from './form-stepper.component';
import { FrontDynamicFormsModule } from '../../../../front-dynamic-forms.module';

export default {
  title: 'FormStepperComponent',
  component: FormStepperComponent,
  decorators: [
    moduleMetadata({
      imports: [FrontDynamicFormsModule],
    }),
  ],
} as Meta<FormStepperComponent>;

const Template: Story<FormStepperComponent> = (args: FormStepperComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  activeClass: ((ngClass = 'text-green-400') => ngClass)(),
  inactiveClass: ((ngClass = 'text-gray-500') => ngClass)(),
  bodyClass: ((ngClass = 'text-red-700') => ngClass)(),
};
