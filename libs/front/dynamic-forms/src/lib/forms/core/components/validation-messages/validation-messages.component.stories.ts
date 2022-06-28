import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ValidationMessagesComponent } from './validation-messages.component';
import { FormControl } from '@angular/forms';

export default {
  title: 'ValidationMessagesComponent',
  component: ValidationMessagesComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<ValidationMessagesComponent>;

const Template: Story<ValidationMessagesComponent> = (
  args: ValidationMessagesComponent
) => ({
  props: args,
});

const form = new FormControl();
form.markAsDirty();
form.markAsTouched();
form.setErrors({
  validation: 'ValidationMessagesComponent Story Book Demo Error Massage',
});

export const Primary = Template.bind({});
Primary.args = {
  filedLabel: 'ValidationMessagesComponent Story Book Demo Label',
  messages: {
    validation: 'ValidationMessagesComponent Story Book Demo Error Massage',
  },
  control: form,
};
