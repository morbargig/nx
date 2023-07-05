import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormSelectComponent } from './form-select.component';

export default {
  title: 'FormSelectComponent',
  component: FormSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FormSelectComponent>;

const Template: Story<FormSelectComponent> = (args: FormSelectComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
