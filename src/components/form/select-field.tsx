import * as Formik from "formik";
import * as Mui from "@mui/material";
import { FieldLabel } from "./field-label";

export const SelectField = (
  props: Mui.SelectProps & {
    individualLabel?: boolean;
  }
) => <Formik.Field component={MuiSelectField} {...props} />;

const MuiSelectField = ({
  label,
  form: { handleChange, handleBlur, isSubmitting, touched, errors, values },
  field,
  onChange,
  individualLabel,
  ...props
}: Formik.FieldProps &
  Mui.SelectProps & {
    individualLabel?: boolean;
  }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);
  return (
    <FieldLabel error={error} label={individualLabel ? label : ""}>
      <Mui.FormControl>
        <Mui.InputLabel id={`${field.name}-label`}>
          {individualLabel ? "" : label}
        </Mui.InputLabel>
        <Mui.Select
          labelId={`${field.name}-label`}
          fullWidth
          error={error}
          disabled={isSubmitting}
          {...field}
          {...props}
          id={field.name}
          label={individualLabel ? "" : label}
          onBlur={handleBlur}
          onChange={onChange || handleChange}
          value={values[field.name]}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: Mui.colors.grey[300],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: Mui.colors.grey[300],
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: Mui.colors.grey[300],
            },
            ...props.sx,
          }}
        />
        <Mui.FormHelperText error={error}>
          <>{error && errors[field.name]}</>
        </Mui.FormHelperText>
      </Mui.FormControl>
    </FieldLabel>
  );
};
