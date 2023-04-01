import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../src";

export default {
  title: "Hooks/Byte format",
  component: Src.Hooks.Demo.ByteFormat,
};

const Template: ComponentStory<typeof Src.Hooks.Demo.ByteFormat> = (args) => (
  <Src.Hooks.Demo.ByteFormat {...args} />
);

export const params = Template.bind({});

params.args = {
  value: 23456787654,
  fix: 2,
};
