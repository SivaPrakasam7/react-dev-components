import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as NumberFormat from "react-number-format";
import * as Src from "src";

export const FormField = (
  props: Mui.TextFieldProps & {
    individualLabel?: boolean;
    type: "text" | "password" | "number";
  }
) => (
  <Formik.Field
    component={
      {
        password: MuiPasswordField,
        text: MuiTextField,
        number: MuiNumberField,
      }[props.type]
    }
    {...props}
  />
);

const MuiTextField = ({
  form: { handleChange, handleBlur, touched, errors, values, isSubmitting },
  field,
  label,
  individualLabel = true,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps & { individualLabel?: boolean }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Src.Components.Form.FieldLabel
      error={error}
      label={individualLabel ? label : ""}
    >
      <Mui.TextField
        fullWidth
        error={error}
        helperText={<>{error && errors[field.name]}</>}
        disabled={isSubmitting}
        {...field}
        {...props}
        id={field.name}
        label={individualLabel ? "" : label}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
      />
    </Src.Components.Form.FieldLabel>
  );
};

const MuiPasswordField = ({
  type,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  label,
  individualLabel = true,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps & { individualLabel?: boolean }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  const [visible, setVisible] = React.useState(false);
  const handleVisible = () => setVisible(!visible);
  return (
    <Src.Components.Form.FieldLabel
      error={error}
      label={individualLabel ? label : ""}
    >
      <Mui.TextField
        fullWidth
        type={visible ? "text" : type}
        error={error}
        helperText={<>{error && errors[field.name]}</>}
        disabled={isSubmitting}
        InputProps={{
          endAdornment: (
            <Mui.InputAdornment position="end" onClick={handleVisible}>
              <Mui.IconButton size="small">
                {visible ? <MuiIcons.VisibilityOff /> : <MuiIcons.Visibility />}
              </Mui.IconButton>
            </Mui.InputAdornment>
          ),
        }}
        {...field}
        {...props}
        sx={{
          "& input": {
            fontFamily: '"Times New Roman" !important',
          },
          ...props.sx,
        }}
        id={field.name}
        label={individualLabel ? "" : label}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
      />
    </Src.Components.Form.FieldLabel>
  );
};

const MuiNumberField = ({
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  InputProps,
  onChange,
  disabled,
  label,
  individualLabel = true,
  type,
  ...props
}: Formik.FieldProps & Mui.TextFieldProps & { individualLabel?: boolean }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <Src.Components.Form.FieldLabel
      error={error}
      label={individualLabel ? label : ""}
    >
      <Mui.TextField
        fullWidth
        error={error}
        helperText={<>{error && errors[field.name]}</>}
        disabled={isSubmitting || disabled}
        {...field}
        {...props}
        id={field.name}
        label={individualLabel ? "" : label}
        onChange={onChange || handleChange}
        onBlur={handleBlur}
        value={values[field.name]}
        InputProps={{
          inputComponent:
            NumberFormatCustom as unknown as React.ElementType<Mui.InputBaseComponentProps>,
          ...InputProps,
        }}
      />
    </Src.Components.Form.FieldLabel>
  );
};

const NumberFormatCustom = React.forwardRef<
  NumberFormat.NumericFormatProps,
  CustomProps
>(({ onChange, ...other }, ref) => (
  <NumberFormat.NumericFormat
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({
        target: {
          name: other.name,
          value: values.formattedValue,
        },
      });
    }}
    thousandSeparator=","
    thousandsGroupStyle="lakh"
    allowNegative={false}
    decimalScale={4}
    {...other}
  />
));

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
