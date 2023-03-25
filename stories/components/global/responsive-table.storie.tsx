import { ComponentStory } from "@storybook/react";
import * as Src from "src";

export default {
  title: "Global/Reponsive Table",
  component: Src.Components.Global.ResponsiveTable,
};

const Template: ComponentStory<typeof Src.Components.Global.ResponsiveTable> = (
  args
) => <Src.Components.Global.ResponsiveTable {...args} />;

export const LargeScreen = Template.bind({});

LargeScreen.args = {
  fileName: "user-list",
  titles: ["ID", "Name", "Email"],
  data: [
    { id: 1, name: "User1", email: "user1@mail.com" },
    { id: 2, name: "User2", email: "user2@mail.com" },
  ],
};

export const MobileScreen = Template.bind({});

MobileScreen.args = {
  isMobile: true,
  fileName: "user-list",
  titles: ["ID", "Name", "Email"],
  data: [
    { id: 1, name: "User1", email: "user1@mail.com" },
    { id: 2, name: "User2", email: "user2@mail.com" },
  ],
};
