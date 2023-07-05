import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormCheckboxComponent } from './form-checkbox.component';

export default {
  title: 'FormCheckboxComponent',
  component: FormCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FormCheckboxComponent>;

const Template: Story<FormCheckboxComponent> = (
  args: FormCheckboxComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
