import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import { FieldLabel } from "./field-label";
import { useUtils } from "../../hooks/utils/use-utils";

export const PreviewFileField = ({
  name,
  accept = "*",
  size = 2097152,
  label,
  sx,
  disabled = false,
}: previewFile.props) => {
  const acceptFileRegex = new RegExp(accept.replace(/\,\s?/g, "|"));
  const {
    setFieldValue,
    setFieldError,
    values,
    errors,
    touched,
    isSubmitting,
  } =
    Formik.useFormikContext<{
      [key: string]: previewFile.customFile;
    }>();
  const error = Boolean(errors[name] && touched[name]);
  const { toBase64, toText, toCSVJson, byteFormat } = useUtils();

  const handleOnChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = [...(e.target?.files || [])];
      if (acceptFileRegex.test(files[0]?.type || "")) {
        if ((files[0]?.size || 0) > size)
          setFieldError(
            name,
            `Upload limit maximum ${byteFormat(size, 2)} allowed`
          );
        else
          setFieldValue(
            name,
            (
              await Promise.all(
                files.map(async (file) => ({
                  file,
                  preview: file.type.includes("csv")
                    ? await toText(file)
                    : await toBase64(file),
                }))
              )
            )?.[0]
          );
      } else setFieldError(name, `Only ${accept} files allowed`);
    },
    []
  );

  const handleClearImageSrc = () => {
    setFieldValue(name, undefined);
  };

  return (
    <FieldLabel error={error} label={label}>
      <Mui.Box
        sx={{
          position: "relative",
          height: "fit-content",
          width: "fit-content",
        }}
      >
        <input
          hidden
          disabled={disabled || isSubmitting}
          accept={accept}
          id={`browse-${name}`}
          type="file"
          onChange={handleOnChange}
          onClick={(event) => {
            (event.target as unknown as { value: any }).value = null;
          }}
        />
        <Mui.Tooltip title="Clear File">
          <Mui.IconButton
            size="small"
            onClick={handleClearImageSrc}
            sx={{
              position: "absolute",
              height: "fit-content",
              width: "fit-content",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              bgcolor: "common.white",
              border: "1px solid black",
              "&:hover": {
                bgcolor: "common.white",
              },
              display: values[name]?.file?.type?.includes("pdf")
                ? "flex"
                : "none",
            }}
          >
            <MuiIcons.Clear fontSize="inherit" />
          </Mui.IconButton>
        </Mui.Tooltip>
        <label
          htmlFor={`browse-${name}`}
          style={{
            display: "inline-block",
            width: "fit-content",
            cursor: "pointer",
          }}
        >
          {values[name]?.file?.type?.includes("csv") ? (
            <Mui.TableContainer
              sx={{
                height: 100,
                width: 100,
                alignSelf: "center",
                objectFit: values[name]?.preview ? "cover" : "contain",
                boxShadow: `0 0 1px ${Mui.colors.grey[500]}`,
                backgroundColor: Mui.colors.grey[100],
                ...sx,
              }}
            >
              {values[name]?.preview &&
              toCSVJson(values[name]?.preview)?.[0] ? (
                <Mui.Table size="small">
                  <Mui.TableHead>
                    {Object.keys(toCSVJson(values[name]?.preview)?.[0]).map(
                      (title) => (
                        <Mui.TableCell>{title.toUpperCase()}</Mui.TableCell>
                      )
                    )}
                  </Mui.TableHead>
                  <Mui.TableBody>
                    {toCSVJson(values[name]?.preview).map((data) => (
                      <Mui.TableRow>
                        {Object.values(data).map((value: any) => (
                          <Mui.TableCell key={value}>{value}</Mui.TableCell>
                        ))}
                      </Mui.TableRow>
                    ))}
                  </Mui.TableBody>
                </Mui.Table>
              ) : (
                <Mui.Typography
                  variant="caption"
                  sx={{
                    fontWeight: 900,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  Empty File
                </Mui.Typography>
              )}
            </Mui.TableContainer>
          ) : (
            <Mui.CardMedia
              component="object"
              data={values[name]?.preview}
              sx={{
                height: 100,
                width: 100,
                alignSelf: "center",
                objectFit: values[name]?.preview ? "cover" : "contain",
                boxShadow: `0 0 1px ${Mui.colors.grey[500]}`,
                backgroundColor: Mui.colors.grey[100],
                ...sx,
              }}
            >
              <Mui.Typography
                variant="caption"
                sx={{
                  fontWeight: 900,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                {accept}
              </Mui.Typography>
            </Mui.CardMedia>
          )}
        </label>
      </Mui.Box>
      {errors[name] && (
        <Mui.Typography color="error" variant="caption">
          {errors[name]}
        </Mui.Typography>
      )}
    </FieldLabel>
  );
};

export declare namespace previewFile {
  export interface props {
    name: string;
    label?: string;
    accept: string;
    size: number;
    sx?: Mui.SxProps;
    disabled?: boolean;
  }
  export type customFile = { file: File; preview: string };
}
