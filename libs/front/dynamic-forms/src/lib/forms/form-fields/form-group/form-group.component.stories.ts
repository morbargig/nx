import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormGroupComponent } from './form-group.component';

export default {
  title: 'FormGroupComponent',
  component: FormGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FormGroupComponent>;

const Template: Story<FormGroupComponent> = (args: FormGroupComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
