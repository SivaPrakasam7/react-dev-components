import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../src";

export default {
  title: "Hooks/Copy",
  component: Src.Hooks.Demo.Copy,
};

const Template: ComponentStory<typeof Src.Hooks.Demo.Copy> = (args) => (
  <Src.Hooks.Demo.Copy {...args} />
);

export const params = Template.bind({});

params.args = {
  content: "Hello World",
};
