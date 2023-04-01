import React from "react";
import { ComponentStory } from "@storybook/react";
import * as Src from "../../src";

export default {
  title: "Hooks/CSV File to JSON",
  component: Src.Hooks.Demo.CsvToJson,
};

const Template: ComponentStory<typeof Src.Hooks.Demo.CsvToJson> = (args) => (
  <Src.Hooks.Demo.CsvToJson />
);

export const params = Template.bind({});

params.args = {};
