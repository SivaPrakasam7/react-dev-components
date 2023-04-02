import React from "react";
import * as Formik from "formik";
import * as FormikMuiPickers from "formik-material-ui-pickers";
import * as Mui from "@mui/material";
import * as MuiDate from "@mui/x-date-pickers";
import { FieldLabel } from "./field-label";

export const DateTimePicker = ({
  dateOnly,
  ...props
}: dateTimePicker.Props & {
  dateOnly?: boolean;
  individualLabel?: boolean;
}) => (
  <Formik.Field
    component={dateOnly ? FormikMuiDatePicker : FormikMuiDateTimePicker}
    {...props}
  />
);

export const FormikMuiDatePicker = ({
  shouldDisableDate,
  individualLabel = false,
  ...props
}: FormikMuiPickers.DatePickerProps & { individualLabel?: boolean }) => {
  const {
    form: { errors, touched, values, ...form },
    field: { name },
  } = props;
  const error = Boolean(errors[name] && touched[name]);
  return (
    <FieldLabel error={error} label={individualLabel ? props.label : ""}>
      <MuiDate.DatePicker
        {...(FormikMuiPickers.fieldToDatePicker(props) as any)}
        label={individualLabel ? "" : props.label}
        shouldDisableDate={
          shouldDisableDate
            ? (dateParam: string) => {
                return new Date().toLocaleDateString(dateParam) ===
                  new Date().toLocaleDateString()
                  ? true
                  : false;
              }
            : undefined
        }
        renderInput={(props) => (
          <Mui.TextField
            {...props}
            {...form}
            fullWidth
            error={error}
            helperText={<>{error && errors[name]}</>}
            // onKeyDown={(e) => e.preventDefault()} // Diable typing
          />
        )}
        PopperProps={{
          sx: {
            bgcolor: (theme: { palette: { mode: string } }) =>
              theme.palette.mode === "dark" ? "background.default" : undefined,
          },
        }}
      />
    </FieldLabel>
  );
};

export const FormikMuiDateTimePicker = ({
  label,
  individualLabel = false,
  ...props
}: FormikMuiPickers.DateTimePickerProps & { individualLabel?: boolean }) => {
  const {
    form: { errors, touched },
    field: { name },
  } = props;
  const error = Boolean(errors[name] && touched[name]);
  return (
    <FieldLabel error={error} label={individualLabel ? label : ""}>
      <MuiDate.DateTimePicker
        {...(FormikMuiPickers.fieldToDateTimePicker(props) as any)}
        label={individualLabel ? "" : label}
        renderInput={(props) => (
          <Mui.TextField
            {...props}
            fullWidth
            error={error}
            helperText={<>{error && errors[name]}</>}
          />
        )}
        PopperProps={
          {
            sx: {
              bgcolor: (theme: { palette: { mode: string } }) =>
                theme.palette.mode === "dark"
                  ? "background.default"
                  : undefined,
            },
          } as any
        }
      />
    </FieldLabel>
  );
};

export declare namespace dateTimePicker {
  export type Props = Required<
    Pick<Mui.TextFieldProps, "name" | "label" | "size">
  > &
    Partial<MuiDate.DateTimePickerProps<any>>;
}
