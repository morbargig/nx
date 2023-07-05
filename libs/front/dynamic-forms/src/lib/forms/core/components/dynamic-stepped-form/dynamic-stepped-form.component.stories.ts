import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DynamicSteppedFormComponent } from './dynamic-stepped-form.component';
import { FrontDynamicFormsModule } from '../../../../front-dynamic-forms.module';

export default {
  title: 'DynamicSteppedFormComponent',
  component: DynamicSteppedFormComponent,
  decorators: [
    moduleMetadata({
        imports: [FrontDynamicFormsModule],
    }),
  ],
} as Meta<DynamicSteppedFormComponent>;

const Template: Story<DynamicSteppedFormComponent> = (
  args: DynamicSteppedFormComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  useStepperService: false,
  config: [],
  validation: null,
};
