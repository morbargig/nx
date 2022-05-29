import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormTextComponent } from './form-text.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'FormTextComponent',
  component: FormTextComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta<FormTextComponent>;

const Template: Story<FormTextComponent> = (args: FormTextComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  config: {
    type: 'Default',
    field: 'FormTextComponentStoryBook',
    label: 'FormTextComponent Story-Book Label',
    value: 'Hi this is FormTextComponent Story Book demo.',
    placeholder: 'placeholder',
    data: {
      rows: 5,
      // inputType: 'number'
    },
  },
  control: new FormControl(),
};
