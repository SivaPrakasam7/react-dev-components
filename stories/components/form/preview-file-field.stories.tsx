import React from "react";
import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Src from "../../../src";

const validation = Yup.object().shape({
  field: Yup.mixed().required(),
});

export default {
  title: "Mui-Fromik/Preview File",
  component: Src.Components.Form.PreviewFileField,
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

const Template: ComponentStory<typeof Src.Components.Form.PreviewFileField> = (
  args
) => <Src.Components.Form.PreviewFileField {...args} />;

export const Image = Template.bind({});

Image.args = {
  name: "file",
  accept: "image/*",
  size: 2097152,
  sx: { height: 200, width: 400 },
};

export const PDF = Template.bind({});

PDF.args = {
  name: "file",
  accept: "application/pdf",
  size: 2097152,
  sx: { height: 200, width: 400 },
};

export const CSV = Template.bind({});

CSV.args = {
  name: "file",
  accept: "text/csv",
  size: 2097152,
  sx: { height: 200, width: 400 },
};
