import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Mui from "@mui/material";
import * as Yup from "yup";
import * as Src from "../../../src";

const validation = Yup.object().shape({
  selectField: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/SelectField",
  component: Src.Components.Form.SelectField,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        selectField: [""],
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

const Template: ComponentStory<typeof Src.Components.Form.SelectField> = (args) => (
  <Src.Components.Form.SelectField {...args} />
);

export const SingleSelect = Template.bind({});

SingleSelect.args = {
  name: "selectField",
  label: "Please select",
  individualLabel: true,
  children: ["option1", "option2", "option3", "option4"].map((option) => (
    <Mui.MenuItem value={option.toLowerCase()}>{option}</Mui.MenuItem>
  )),
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
  name: "selectField",
  label: "Please select",
  individualLabel: true,
  multiple: true,
  children: ["option1", "option2", "option3", "option4"].map((option) => (
    <Mui.MenuItem value={option.toLowerCase()}>{option}</Mui.MenuItem>
  )),
};
