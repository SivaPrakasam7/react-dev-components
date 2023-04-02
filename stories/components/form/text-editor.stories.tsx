import React from "react";
import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Src from "../../../src";

const validation = Yup.object().shape({
  field: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/TextEditor",
  component: Src.Components.Form.TextEditor,
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
};

const Template: ComponentStory<typeof Src.Components.Form.TextEditor> = (
  args
) => <Src.Components.Form.TextEditor {...args} />;

export const Editor = Template.bind({});

Editor.args = {
  name: "field",
  label: "Please enter input",
};
