import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Components from "src/app/components";

const validation = Yup.object().shape({
  field: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/TextField",
  component: Components.Form.FormField,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        field: "",
      },
      validationSchema: validation,
    },
  },
  argTypes: {
    type: {
      options: ["text", "password", "number"],
      control: { type: "radio" },
    },
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

const Template: ComponentStory<typeof Components.Form.FormField> = (args) => (
  <Components.Form.FormField {...args} />
);

export const Text = Template.bind({});

Text.args = {
  type: "text",
  name: "field",
  label: "Please enter text",
  individualLabel: true,
};

export const Password = Template.bind({});

Password.args = {
  type: "password",
  name: "field",
  label: "Please enter password",
  individualLabel: true,
};

export const Number = Template.bind({});

Number.args = {
  type: "number",
  name: "field",
  label: "Please enter number",
  individualLabel: true,
  inputProps: {
    thousandSeparator: ",",
    thousandsGroupStyle: "lakh",
    allowNegative: false,
    decimalScale: 4,
  },
};
