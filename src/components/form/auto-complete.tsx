import * as Formik from "formik";
import * as Mui from "@mui/material";
import { FieldLabel } from "./field-label";

export const AutoCompleteField = (
  props: Mui.AutocompleteProps<any, boolean, boolean, boolean> &
    Mui.TextFieldProps & {
      individualLabel?: boolean;
    }
) => <Formik.Field component={MuiAutoComplete} {...props} />;

const MuiAutoComplete = ({
  label,
  form: { setFieldValue, isSubmitting, touched, errors, values },
  field,
  individualLabel,
  ...props
}: Formik.FieldProps &
  Mui.TextFieldProps &
  Mui.AutocompleteProps<any, boolean, boolean, boolean> & {
    individualLabel?: boolean;
  }) => {
  const error = Boolean(errors[field.name] && touched[field.name]);

  const handleChange = (_: any, newValue: { dial_code: string }) => {
    setFieldValue(field.name, newValue);
  };

  return (
    <FieldLabel error={error} label={individualLabel ? label : ""}>
      <Mui.Autocomplete
        size="small"
        fullWidth
        disabled={isSubmitting}
        {...field}
        {...props}
        onChange={handleChange}
        value={values[field.name] ? values[field.name] : []}
        PaperComponent={(props) => (
          <Mui.Paper
            elevation={1}
            {...props}
            sx={{ bgcolor: "background.default" }}
          />
        )}
        renderInput={(params) => (
          <Mui.TextField
            {...params}
            label={individualLabel ? "" : label}
            variant={props.variant}
            size={props.size}
            error={error}
            helperText={
              <>
                {error &&
                  JSON.stringify(errors[field.name]).replaceAll(
                    /(\".*\"\:|[\{\}\,\"\:])/g,
                    ""
                  )}
              </>
            }
          />
        )}
        sx={{
          "& fieldset": {
            borderColor: error ? "error.main" : undefined,
          },
        }}
      />
    </FieldLabel>
  );
};
