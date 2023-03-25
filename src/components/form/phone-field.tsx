import * as Formik from "formik";
import * as NumberFormat from "react-number-format";
import * as Mui from "@mui/material";
import React from "react";
import * as Src from "src";

export const PhoneNumberField = (
  props: Mui.AutocompleteProps<any, boolean, boolean, boolean> &
    Mui.TextFieldProps & {
      individualLabel?: boolean;
    }
) => <Formik.Field component={MuiPhoneNumberField} {...props} />;

const MuiPhoneNumberField = ({
  label,
  form: { setFieldValue, isSubmitting, touched, errors, values },
  field,
  disabled,
  individualLabel,
  defaultCountry,
  ...props
}: Formik.FieldProps &
  Mui.TextFieldProps & {
    individualLabel?: boolean;
    defaultCountry?: "IN";
  }) => {
  const [countryCode, setCountryCode] = React.useState<string>(
    Src.Constants.COUNTRY_FLAG_CODE.find(({ dial_code }) =>
      values[field.name]?.includes(dial_code)
    )?.dial_code || "+91"
  );
  const error = Boolean(errors[field.name] && touched[field.name]);

  const handleCountryCodeChange = (_: any, newValue: {
    flag: any; dial_code: string 
}) => {
    setCountryCode((prev) => {
      setFieldValue(
        field.name,
        `${newValue?.dial_code} ${values[field.name]?.replace(prev, "")}`
      );
      return newValue?.dial_code as string;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFieldValue(field.name, `${countryCode} ${event.target.value}`);

  React.useEffect(() => {
    if (
      !Boolean(
        Src.Constants.COUNTRY_FLAG_CODE.find(({ dial_code }) =>
          values[field.name]?.includes(dial_code)
        )?.dial_code
      )
    ) {
      setCountryCode(
        Src.Constants.COUNTRY_FLAG_CODE.find(({ code }) => code === defaultCountry)
          ?.dial_code || "+91"
      );
    }
  }, []);

  return (
    <Src.Components.Form.FieldLabel
      error={error}
      label={individualLabel ? label : ""}
    >
      <Mui.TextField
        fullWidth
        placeholder="0987654321"
        {...props}
        id={field.name}
        label={individualLabel ? "" : label}
        disabled={disabled || isSubmitting}
        error={error}
        helperText={<>{error && errors[field.name]}</>}
        InputProps={{
          startAdornment: (
            <Mui.InputAdornment position="start">
              <Mui.Autocomplete
                disableClearable
                disabled={isSubmitting || disabled}
                onChange={handleCountryCodeChange}
                value={Src.Constants.COUNTRY_FLAG_CODE.find(
                  ({ dial_code }) => dial_code === countryCode
                )}
                autoHighlight
                options={Src.Constants.COUNTRY_FLAG_CODE}
                getOptionLabel={(option) =>
                  `${option.flag} ${option.dial_code}`
                }
                renderOption={(props, option) => (
                  <Mui.Typography component="li" data-value={option} {...props}>
                    {option.flag} {option.dial_code}
                  </Mui.Typography>
                )}
                renderInput={(params) => (
                  <Mui.TextField
                    {...params}
                    variant={props.variant}
                    size={props.size}
                    sx={{ width: 100 + (countryCode.length || 1) * 4.5 }}
                  />
                )}
                PaperComponent={(props) => (
                  <Mui.Paper
                    elevation={1}
                    {...props}
                    sx={{ bgcolor: "background.default" }}
                  />
                )}
                sx={{
                  ml: { outlined: -1.6, filled: -1.6, standard: 1 }[
                    props?.variant || "outlined"
                  ],
                  mb: props.variant === "filled" ? 2 : 0,
                  "& fieldset": {
                    border: "none",
                    "&:hover": { border: "none" },
                  },
                  "& .MuiInputBase-root": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiInputBase-root::before": {
                    border: "none",
                    "&:hover": {
                      border: "none",
                    },
                  },
                }}
              />
            </Mui.InputAdornment>
          ),
          inputComponent:
            PhoneNumberFormat as unknown as React.ElementType<Mui.InputBaseComponentProps>,
          ...props.InputProps,
        }}
        value={values[field.name]?.replace(countryCode, "")?.trim()}
        onChange={handleChange}
      />
    </Src.Components.Form.FieldLabel>
  );
};

export const PhoneNumberFormat = React.forwardRef<
  NumberFormat.NumericFormatProps,
  CustomProps
>(({ onChange, ...other }, ref) => (
  <NumberFormat.PatternFormat
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({
        target: {
          name: other.name,
          value: values.value,
        },
      });
    }}
    format="##### #####"
    {...other}
  />
));

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
