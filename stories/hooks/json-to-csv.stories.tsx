import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../src";

export default {
  title: "Hooks/JSON to CSV File",
  component: Src.Hooks.Demo.JsonToCSV,
};

const Template: ComponentStory<typeof Src.Hooks.Demo.JsonToCSV> = (args) => (
  <Src.Hooks.Demo.JsonToCSV {...args} />
);

export const params = Template.bind({});

params.args = {
  fileName: "test-data.csv",
  title: "ID, Name, Email",
  data: new Array(5).fill(undefined).map((_, index) => ({
    id: index + 1,
    name: `user${index + 1}`,
    email: `user${index + 1}@mail.com`,
  })),
};
