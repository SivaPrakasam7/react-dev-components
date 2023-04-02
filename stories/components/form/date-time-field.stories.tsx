import React from "react";
import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as MuiDate from "@mui/x-date-pickers";
import * as AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";
import * as Yup from "yup";
import * as Src from "../../../src";

const validation = Yup.object().shape({
  dateTime: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/DateTimePicker",
  component: Src.Components.Form.DateTimePicker,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        dateTime: "",
      },
      validationSchema: validation,
    },
  },
  argTypes: {
    // variant: {
    //   options: ["filled", "outlined", "standard"],
    //   control: { type: "radio" },
    // },
    // size: {
    //   options: ["small", "medium", "large"],
    //   control: { type: "radio" },
    // },
  },
};

const Template: ComponentStory<typeof Src.Components.Form.DateTimePicker> = (
  args
) => (
  <MuiDate.LocalizationProvider dateAdapter={AdapterDateFns.AdapterDateFns}>
    <Src.Components.Form.DateTimePicker {...args} />
  </MuiDate.LocalizationProvider>
);

export const Date = Template.bind({});

Date.args = {
  dateOnly: true,
  name: "dateTime",
  label: "Please select date",
  individualLabel: true,
};

export const Time = Template.bind({});

Time.args = {
  dateOnly: false,
  name: "dateTime",
  label: "Please select date and time",
  individualLabel: true,
};
