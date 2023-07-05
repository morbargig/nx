import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormAutocompleteComponent } from './form-autocomplete.component';

export default {
  title: 'FormAutocompleteComponent',
  component: FormAutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FormAutocompleteComponent>;

const Template: Story<FormAutocompleteComponent> = (
  args: FormAutocompleteComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
