import React from "react";
import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Src from "../../../src";

export default {
  title: "Mui-Fromik/Submit Button",
  component: Src.Components.Form.SubmitButton,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {},
    },
  },
  argTypes: {
    variant: {
      options: ["text", "contained", "outlined"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Src.Components.Form.SubmitButton> = (
  args
) => <Src.Components.Form.SubmitButton {...args} />;

export const Options = Template.bind({});

Options.args = {
  children: "Click to submit",
  loading: false,
};
