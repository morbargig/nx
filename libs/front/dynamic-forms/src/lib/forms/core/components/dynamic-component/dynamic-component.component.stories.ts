import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DynamicComponentComponent } from './dynamic-component.component';

export default {
  title: 'DynamicComponentComponent',
  component: DynamicComponentComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<DynamicComponentComponent>;

const Template: Story<DynamicComponentComponent> = (
  args: DynamicComponentComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
