import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../../src";

export default {
  title: "Global/Timer",
  component: Src.Components.Global.Timer,
};

const Template: ComponentStory<typeof Src.Components.Global.Timer> = (args) => (
  <Src.Components.Global.Timer {...args} />
);

export const Increase = Template.bind({});

Increase.args = {
  children: "Timer : ",
  time: new Date().getTime(),
  increase: true,
};

export const Decrease = Template.bind({});

Decrease.args = {
  children: "Timer : ",
  time: new Date().getTime() + 1000 * 60 * 60 * 48,
};
