import React from "react";
import * as Mui from "@mui/material";
import * as Formik from "formik";
import * as ReactIconsGR from "react-icons/gr";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

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
    const { useDataURLFile, byteFormat } = Hooks.Utils.useUtils();
    const [imageSrc, setImageSrc] = React.useState<any>(null);
    const {
      setFieldValue,
      setFieldError,
      values,
      errors,
      touched,
      isSubmitting,
    } = Formik.useFormikContext<{ [key: string]: File[] | string[] }>();
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

    const images = React.useMemo(
      () =>
        enableMultiple
          ? [...(values[name] || [])]
          : [values[name]].filter(Boolean),
      [values[name]]
    );

    const handleOnChange = React.useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/(image\/*)/.test(e.target?.files?.[0]?.type || "")) {
          if ((e.target?.files?.[0]?.size || 0) > size)
            setFieldError(
              name,
              `Upload limit maximum ${byteFormat(size, 0)} allowed`
            );
          else if (enableCropper && !enableMultiple)
            setImageSrc(URL.createObjectURL(e.target?.files?.[0] as File));
          else
            setFieldValue(
              name,
              enableMultiple
                ? (e.target as unknown as { files: Blob[] })?.files
                : (e.target as unknown as { files: Blob[] })?.files?.[0]
            );
        } else setFieldError(name, "Only .jpg, .jpeg or .png files allowed");
      },
      [name]
    );

    const handleOnDrop = React.useCallback(
      async (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (/(image\/*)/.test(event.dataTransfer?.files?.[0]?.type || "")) {
          if ((event.dataTransfer?.files?.[0]?.size || 0) > size)
            setFieldError(
              name,
              `Upload limit maximum ${byteFormat(size, 0)} allowed`
            );
          else if (enableCropper && !enableMultiple)
            setImageSrc(URL.createObjectURL(event.dataTransfer?.files?.[0]));
          else
            setFieldValue(
              name,
              enableMultiple
                ? (event.dataTransfer as unknown as { files: Blob[] })?.files
                : (event.dataTransfer as unknown as { files: Blob[] })
                    ?.files?.[0]
            );
        } else setFieldError(name, "Only .jpg, .jpeg or .png files allowed");
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
      (img: string) => {
        setFieldValue(
          name,
          useDataURLFile(img, `Cropped-${new Date().getTime()}`)
        );
        setImageSrc("");
      },
      [name]
    );

    const onCancel = React.useCallback(() => setImageSrc(""), [name]);

    return (
      <Components.Form.FieldLabel error={error} label={label}>
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
                  <ReactIconsGR.GrFormAdd
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
                    imageSrc={images[0] as File}
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
                ) : images?.length ? (
                  images?.slice(0, maxImageLength).map((src, index) => (
                    <Mui.Box sx={{ position: "relative", float: "left" }}>
                      <ShowImage
                        key={index}
                        imageSrc={src as File}
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
        <Components.Global.ImageCropper
          key={name}
          imageSrc={imageSrc}
          save={onSave}
          cancel={onCancel}
          width={enableAvatar ? 200 : (width as number)}
          height={enableAvatar ? 200 : (height as number)}
        />
      </Components.Form.FieldLabel>
    );
  }
);

const ShowImage = ({
  imageSrc,
  sx,
  avatar = false,
}: Mui.CardMediaProps & { imageSrc: File; avatar?: boolean }) => {
  const [image, setImage] = React.useState<string>("");
  const { toBase64 } = Hooks.Utils.useUtils();

  React.useEffect(() => {
    toBase64(imageSrc).then((res) => setImage(res as string));
  }, [imageSrc?.name]);

  return avatar ? (
    <Mui.Avatar
      src={image}
      sx={{
        alignSelf: "center",
        objectFit: image ? "cover" : "contain",
        boxShadow: `0 0 1px ${Mui.colors.grey[500]}`,
        backgroundColor: Mui.colors.grey[100],
        ...sx,
      }}
    />
  ) : (
    <Mui.CardMedia
      component="img"
      src={image}
      sx={{
        alignSelf: "center",
        objectFit: image ? "cover" : "contain",
        boxShadow: `0 0 1px ${Mui.colors.grey[500]}`,
        backgroundColor: Mui.colors.grey[100],
        ...sx,
      }}
    />
  );
};

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
}
