import { ComponentStory } from "@storybook/react";
import * as Components from "src/app/components";

export default {
  title: "Global/Timer",
  component: Components.Global.Timer,
};

const Template: ComponentStory<typeof Components.Global.Timer> = (args) => (
  <Components.Global.Timer {...args} />
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
