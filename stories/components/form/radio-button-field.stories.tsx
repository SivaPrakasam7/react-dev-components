import React from "react";
import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Src from "../../../src";

const validation = Yup.object().shape({
  radioButton: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/RadioButton",
  component: Src.Components.Form.RadioButton,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        radioButton: "",
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
    direction: {
      options: ["row", "column"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Src.Components.Form.RadioButton> = (
  args
) => <Src.Components.Form.RadioButton {...args} />;

export const Options = Template.bind({});

Options.args = {
  name: "radioButton",
  label: "Please choose option",
  options: ["option1", "option2", "option3", "option4"],
};
