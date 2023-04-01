import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../../src";

export default {
  title: "Global/Preview File",
  component: Src.Components.Global.PreviewFile,
  argTypes: {
    setErrorCallback: {
      action: "Error",
    },
  },
};

const Template: ComponentStory<typeof Src.Components.Global.PreviewFile> = (
  args
) => <Src.Components.Global.PreviewFile {...args} />;

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
