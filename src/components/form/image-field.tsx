import * as Formik from "formik";
import React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { FieldLabel } from "./field-label";
import { ImageCropper } from "../global/image-cropper";
import { useUtils } from "../../hooks/utils/use-utils";

export const ImageField = React.memo(
  ({
    name,
    height,
    width,
    sx,
    label,
    disabled,
    size = 2097152,
    enableAvatar = false,
    enableCropper = false,
    enableMultiple = false,
  }: imageCropper.Props & Mui.CardMediaProps) => {
    const theme = Mui.useTheme();
    const maxImageLength = 4;
    const { useDataURLFile, byteFormat, toBase64 } = useUtils();
    const [imageSrc, setImageSrc] = React.useState<any>(null);
    const {
      setFieldValue,
      setFieldError,
      values,
      errors,
      touched,
      isSubmitting,
    } =
      Formik.useFormikContext<{
        [key: string]: imageCropper.customFile[];
      }>();
    const error = Boolean(errors[name] && touched[name]);
    let widthAlign = React.useMemo(
      () =>
        ({ 1: 1, 2: 1, 3: 2, 4: 2 }?.[
          values[name]?.length > 4 ? 4 : values[name]?.length
        ]),
      [values[name]?.length]
    );
    let heightAlign = React.useMemo(
      () =>
        ({ 1: 1, 2: 2, 3: 2, 4: 2 }?.[
          values[name]?.length > 4 ? 4 : values[name]?.length
        ]),
      [values[name]?.length]
    );

    const handleFile = React.useCallback(
      async (files: File[]) => {
        if (
          !files.map((file) => !/(image\/*)/.test(file.type)).filter(Boolean)[0]
        ) {
          if (!files.map((file) => file.size <= size).filter(Boolean)[0])
            setFieldError(
              name,
              `Upload limit maximum ${byteFormat(size, 0)} allowed`
            );
          else if (enableCropper && !enableMultiple)
            setImageSrc(URL.createObjectURL(files[0]));
          else
            setFieldValue(
              name,
              await Promise.all(
                files.map(async (file) => ({
                  file,
                  preview: await toBase64(file),
                }))
              )
            );
        } else setFieldError(name, "Only .jpg, .jpeg or .png files allowed");
      },
      [name]
    );

    const handleOnChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile([...e.target?.files]);
      },
      [name]
    );

    const handleOnDrop = React.useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        handleFile([...event.dataTransfer?.files]);
      },
      [name]
    );

    const handleNoop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
      },
      [name]
    );

    const onSave = React.useCallback(
      async (img: string) => {
        setFieldValue(name, [
          {
            ...(await useDataURLFile(img, `Cropped-${new Date().getTime()}`)),
            preview: img,
          },
        ]);
        setImageSrc("");
      },
      [name]
    );

    const onCancel = React.useCallback(() => setImageSrc(""), [name]);

    return (
      <FieldLabel error={error} label={label}>
        <Mui.Stack
          spacing={2}
          alignItems="flex-start"
          component="div"
          sx={{ width: "100%", position: "relative" }}
          onDrop={!disabled ? handleOnDrop : undefined}
          onDragOver={!disabled ? handleNoop : undefined}
          onDragEnter={!disabled ? handleNoop : undefined}
        >
          <input
            disabled={disabled || isSubmitting}
            hidden
            accept="image/*"
            id={`browse-${name}`}
            type="file"
            name={name}
            multiple={enableMultiple}
            onChange={!disabled ? handleOnChange : undefined}
            onClick={(event) => {
              (event.target as unknown as { value: any }).value = null;
            }}
          />
          <Mui.Tooltip title={`Maximum size is ${byteFormat(size, 0)}`}>
            <Mui.Badge
              overlap={enableAvatar ? "circular" : "rectangular"}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <Mui.IconButton
                  color="inherit"
                  onClick={() =>
                    document.getElementById(`browse-${name}`)?.click()
                  }
                  sx={{
                    p: 0,
                    width: "fit-content",
                    height: "fit-content",
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    "& path": {
                      stroke: theme.palette.common.white,
                    },
                  }}
                >
                  <MuiIcons.Add
                    style={{
                      width: 25,
                    }}
                  />
                </Mui.IconButton>
              }
            >
              <label
                htmlFor={`browse-${name}`}
                style={{
                  display: "inline-block",
                  width,
                  height,
                  borderRadius: 5,
                  boxShadow: enableAvatar
                    ? undefined
                    : values[name] && "0px 0px 10px #00000050",
                  overflow: enableAvatar ? undefined : "hidden",
                  backgroundColor: enableAvatar
                    ? undefined
                    : Mui.colors.grey[200],
                }}
              >
                {enableAvatar && !enableMultiple ? (
                  <ShowImage
                    avatar
                    imageSrc={values[name][0]}
                    sx={{
                      cursor: "pointer",
                      textAlign: "center",
                      objectFit: "cover",
                      boxShadow: values[name] && "0px 0px 10px #00000050",
                      border: (theme) =>
                        error
                          ? `1px solid ${theme.palette.error.main}`
                          : values[name]?.[0]
                          ? undefined
                          : `1px solid ${theme.palette.grey[400]}`,
                      height,
                      width,
                      ...sx,
                    }}
                  />
                ) : values[name]?.length ? (
                  values[name]?.slice(0, maxImageLength).map((src, index) => (
                    <Mui.Box sx={{ position: "relative", float: "left" }}>
                      <ShowImage
                        key={index}
                        imageSrc={src}
                        sx={{
                          cursor: "pointer",
                          textAlign: "center",

                          objectFit: "cover",
                          width:
                            typeof values[name] === "string"
                              ? width
                              : (width as number) / (widthAlign || 1),
                          height:
                            typeof values[name] === "string"
                              ? height
                              : (height as number) / (heightAlign || 1),
                        }}
                      />
                      {typeof values[name] !== "string" &&
                        values[name].length > maxImageLength &&
                        index === maxImageLength - 1 && (
                          <Mui.Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              position: "absolute",
                              top: 0,
                              bgcolor: "#00000090",
                              color: "#fff",
                              width:
                                width === "string"
                                  ? width
                                  : (width as number) / (widthAlign || 1),
                              height:
                                height === "string"
                                  ? height
                                  : (height as number) / (heightAlign || 1),
                            }}
                          >
                            <Mui.Typography variant="body1">{`+${
                              values[name].length - maxImageLength
                            } more`}</Mui.Typography>
                          </Mui.Stack>
                        )}
                    </Mui.Box>
                  ))
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
                    Click to browse / Drag here
                  </Mui.Typography>
                )}
              </label>
            </Mui.Badge>
          </Mui.Tooltip>
          {errors[name] && (
            <Mui.Typography color="error" variant="caption">
              {errors[name]}
            </Mui.Typography>
          )}
          <Mui.Box
            sx={{
              display: disabled && !enableAvatar ? "block" : "none",
              boxShadow: `0 0 100px rgba(0, 0, 0, 0.26) inset`,
              zIndex: 1,
              position: "absolute",
              height: "100%",
              width: "100%",
              top: 0,
              borderRadius: 1,
            }}
          />
        </Mui.Stack>
        <ImageCropper
          key={name}
          imageSrc={imageSrc}
          save={onSave}
          cancel={onCancel}
          width={enableAvatar ? 200 : (width as number)}
          height={enableAvatar ? 200 : (height as number)}
        />
      </FieldLabel>
    );
  }
);

const ShowImage = ({
  imageSrc,
  sx,
  avatar = false,
}: Mui.CardMediaProps & {
  imageSrc: imageCropper.customFile;
  avatar?: boolean;
}) =>
  avatar ? (
    <Mui.Avatar
      src={imageSrc?.preview}
      sx={{
        alignSelf: "center",
        objectFit: imageSrc?.preview ? "cover" : "contain",
        boxShadow: `0 0 1px ${Mui.colors.grey[500]}`,
        backgroundColor: Mui.colors.grey[100],
        ...sx,
      }}
    />
  ) : (
    <Mui.CardMedia
      component="img"
      src={imageSrc?.preview}
      sx={{
        alignSelf: "center",
        objectFit: imageSrc?.preview ? "cover" : "contain",
        boxShadow: `0 0 1px ${Mui.colors.grey[500]}`,
        backgroundColor: Mui.colors.grey[100],
        ...sx,
      }}
    />
  );

export declare namespace imageCropper {
  export interface Props {
    name: string;
    height: string | number;
    width: string | number;
    size?: number;
    label?: string;
    enableCropper?: boolean;
    enableMultiple?: boolean;
    disabled?: boolean;
    enableAvatar?: boolean;
    initialName?: string;
  }
  export type customFile = { file: File; preview: string };
}
