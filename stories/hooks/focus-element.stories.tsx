import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../src";

export default {
  title: "Hooks/Focus Element",
  component: Src.Hooks.Demo.FocusElement,
};

const Template: ComponentStory<typeof Src.Hooks.Demo.FocusElement> = (args) => (
  <Src.Hooks.Demo.FocusElement {...args} />
);

export const params = Template.bind({});

params.args = {
  id: "box1",
};
