import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Components from "../../components";

export const RadioButton = (props: radioButton.Type) => (
  <Formik.Field component={MuiRadioButton} {...props} />
);

export const MuiRadioButton = ({
  label,
  form: { touched, errors, values, setFieldValue, ...form },
  field,
  options,
  size,
  disabled,
  direction = "column",
}: Formik.FieldProps &
  Mui.TextFieldProps & { options: string[]; direction?: "row" | "column" }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  const handleValue = React.useCallback(
    (value: string) =>
      disabled ? undefined : setFieldValue(field.name, value),
    [field.name]
  );

  return (
    <Components.Form.FieldLabel error={error} label={label}>
      <Mui.Stack
        direction={direction}
        spacing={2}
        alignItems="flex-start"
        sx={{ textTransform: "capitalize" }}
      >
        {options.map((value) => (
          <Mui.FormControlLabel
            disabled={disabled}
            key={value}
            control={
              <Mui.Radio
                {...field}
                {...form}
                size={size}
                disabled={disabled}
                onChange={() => handleValue(value)}
                checked={value === values[field.name]}
              />
            }
            label={value}
            sx={{ ml: 0 }}
            onClick={() => handleValue(value)}
          />
        ))}
      </Mui.Stack>
      <Mui.FormHelperText
        error={error}
        sx={{ display: error ? "flex" : "none" }}
      >
        <>{error && errors[field.name]}</>
      </Mui.FormHelperText>
    </Components.Form.FieldLabel>
  );
};

export declare namespace radioButton {
  export type Type = Partial<Mui.RadioProps> & {
    label: React.ReactNode;
    radioValues: string[];
  };
}
