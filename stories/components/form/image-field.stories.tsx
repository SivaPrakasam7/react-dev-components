import React from "react";
import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Src from "../../../src";

const validation = Yup.object().shape({
  field: Yup.mixed().required(),
});

export default {
  title: "Mui-Fromik/ImageField",
  component: Src.Components.Form.ImageField,
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
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Src.Components.Form.ImageField> = (args) => (
  <Src.Components.Form.ImageField {...args} />
);

export const BannerWithoutCropper = Template.bind({});

BannerWithoutCropper.args = {
  name: "field",
  label: "Please select image",
  height: 250,
  width: 400,
};

export const BannerWithCropper = Template.bind({});

BannerWithCropper.args = {
  name: "field",
  label: "Please select image",
  height: 250,
  width: 400,
  enableCropper: true,
};

export const MultipleBanner = Template.bind({});

MultipleBanner.args = {
  name: "field",
  label: "Please select multiple image",
  height: 250,
  width: 400,
  enableMultiple: true,
};

export const ProfileWithoutCropper = Template.bind({});

ProfileWithoutCropper.args = {
  name: "field",
  label: "Profile",
  height: 100,
  width: 100,
  enableAvatar: true,
};

export const ProfileWithCropper = Template.bind({});

ProfileWithCropper.args = {
  name: "field",
  label: "Profile",
  height: 100,
  width: 100,
  enableAvatar: true,
  enableCropper: true,
};
