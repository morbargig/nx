import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormTextComponent } from './form-text.component';

export default {
  title: 'FormTextComponent',
  component: FormTextComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FormTextComponent>;

const Template: Story<FormTextComponent> = (args: FormTextComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
