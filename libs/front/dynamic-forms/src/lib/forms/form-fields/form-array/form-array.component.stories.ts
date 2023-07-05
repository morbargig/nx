import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormArrayComponent } from './form-array.component';

export default {
  title: 'FormArrayComponent',
  component: FormArrayComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FormArrayComponent>;

const Template: Story<FormArrayComponent> = (args: FormArrayComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
