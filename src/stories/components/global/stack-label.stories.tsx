import { ComponentStory } from "@storybook/react";
import * as Components from "src/app/components";

export default {
  title: "Global/Stack Label",
  component: Components.Global.StackLabel,
  argTypes: {
    direction: {
      options: ["column", "row"],
      control: { type: "radio" },
    },
    titleColor: { control: "color" },
    labelColor: {
      options: ["success", "error", "warning", "info", "primary", "secondary"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Components.Global.StackLabel> = (
  args
) => <Components.Global.StackLabel {...args} />;

export const Props = Template.bind({});

Props.args = {
  direction: "column",
  title: "Name",
  label: "Username",
  node: true,
  medium: true,
  valBold: true,
  time: false,
};
