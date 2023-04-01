import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../src";

export default {
  title: "Hooks/Encode Decode",
  component: Src.Hooks.Demo.EncodeDecodeDemo,
  argTypes: {
    mode: {
      options: ["encode", "decode"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Src.Hooks.Demo.EncodeDecodeDemo> = (
  args
) => <Src.Hooks.Demo.EncodeDecodeDemo {...args} />;

export const Encode = Template.bind({});

Encode.args = {
  mode: "encode",
  value: "hello world",
};

export const Decode = Template.bind({});

Decode.args = {
  mode: "decode",
  value: "aGVsbG8gd29ybGQ=",
};
