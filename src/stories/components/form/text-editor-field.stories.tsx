import { ComponentStory } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import * as Components from "src/app/components";

const validation = Yup.object().shape({
  textEditorField: Yup.string().required(),
});

export default {
  title: "Mui-Fromik/TextEditorField",
  component: Components.Form.TextEditorField,
  decorators: [withFormik],
  parameters: {
    formik: {
      enableReinitialize: false,
      initialValues: {
        textEditorField: "+91 8273586674",
      },
      validationSchema: validation,
    },
  },
};

const Template: ComponentStory<typeof Components.Form.TextEditorField> = (
  args
) => <Components.Form.TextEditorField {...args} />;

export const Editor = Template.bind({});

Editor.args = {
  name: "textEditorField",
  label: "Please enter message",
  height: 300,
  width: "100%",
};
