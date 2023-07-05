import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormRadioComponent } from './form-radio.component';

export default {
  title: 'FormRadioComponent',
  component: FormRadioComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FormRadioComponent>;

const Template: Story<FormRadioComponent> = (args: FormRadioComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
