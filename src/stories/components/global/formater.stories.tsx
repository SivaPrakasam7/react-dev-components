import { ComponentStory } from "@storybook/react";
import * as Components from "src/app/components";

export default {
  title: "Global/Formater",
  component: Components.Global.Format,
  argTypes: {
    type: {
      options: ["coin", "number", "amount", "percentage"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof Components.Global.Format> = (args) => (
  <Components.Global.Format {...args} />
);

export const Number = Template.bind({});

Number.args = {
  type: "number",
  number: 2546.3498637,
};

export const Amount = Template.bind({});

Amount.args = {
  type: "amount",
  number: 2546.3498637,
};

export const Coin = Template.bind({});

Coin.args = {
  type: "coin",
  number: 2546.3498637,
  coin: "ETH",
};

export const Percentage = Template.bind({});

Percentage.args = {
  type: "percentage",
  number: 2546.3498637,
};
