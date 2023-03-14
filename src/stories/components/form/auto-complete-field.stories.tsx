import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Components from "src/app/components";

const validation = Yup.object().shape({
  autoCompleteField: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/AutoCompleteField",
  component: Components.Form.AutoCompleteField,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        autoCompleteField: "",
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

const Template: ComponentStory<typeof Components.Form.AutoCompleteField> = (
  args
) => <Components.Form.AutoCompleteField {...args} />;

export const SingleSelect = Template.bind({});

SingleSelect.args = {
  name: "autoCompleteField",
  label: "Please select",
  options: ["option1", "option2", "option3", "option4"],
  individualLabel: true,
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
  name: "autoCompleteField",
  label: "Please select",
  options: ["option1", "option2", "option3", "option4"],
  individualLabel: true,
  multiple: true,
  disableCloseOnSelect: true,
};
