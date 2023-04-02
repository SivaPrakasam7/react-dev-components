import React from "react";
import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Src from "../../../src";

const validation = Yup.object().shape({
  checkBox: Yup.boolean().notOneOf([false], "Please select option").required(),
});

export default {
  title: "Mui-Fromik/CheckBox",
  component: Src.Components.Form.CheckBox,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        checkBox: "",
      },
      validationSchema: validation,
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Src.Components.Form.CheckBox> = (
  args
) => <Src.Components.Form.CheckBox {...args} />;

export const Option = Template.bind({});

Option.args = {
  name: "checkBox",
  label: "Select option",
  options: ["option1", "option2", "option3", "option4"],
};
