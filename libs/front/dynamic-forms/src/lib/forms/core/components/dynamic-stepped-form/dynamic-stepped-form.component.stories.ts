import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SteppedFormFooterMode } from '../../interfaces/dynamic-stepped-form';
import { DynamicSteppedFormComponent } from './dynamic-stepped-form.component';

export default {
  title: 'DynamicSteppedFormComponent',
  component: DynamicSteppedFormComponent,
  decorators: [
    moduleMetadata({
      imports: [],
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
  formRowCssClass: '',
  formCssClass: '',
  bodyClass: '',
  isLinear: true,
  isEditable: true,
  footerMode: SteppedFormFooterMode.Default,
};
