import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Components from "src/app/components";

const validation = Yup.object().shape({
  phoneNumberField: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/PhoneNumberField",
  component: Components.Form.PhoneNumberField,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        phoneNumberField: "+91 8273586674",
      },
      validationSchema: validation,
    },
  },
  argTypes: {
    variant: {
      options: ["filled", "outlined", "standard"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Components.Form.PhoneNumberField> = (
  args
) => <Components.Form.PhoneNumberField {...args} />;

export const PhoneNumber = Template.bind({});

PhoneNumber.args = {
  name: "phoneNumberField",
  label: "Please enter mobile number",
  individualLabel: true,
  inputProps: {
    format: "### ### ####",
  },
};
