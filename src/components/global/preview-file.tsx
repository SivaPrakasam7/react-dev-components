import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import { useUtils } from "../../hooks/utils/use-utils";

export const PreviewFile = ({
  name,
  accept = "*",
  size = 1048576,
  sx,
  setFileCallback,
  setErrorCallback,
}: previewFile.props) => {
  const acceptFileRegex = new RegExp(accept.replace(/\,\s?/g, "|"));
  const [imageSrc, setImageSrc] = React.useState<File>();
  const [image, setImage] = React.useState("");
  const { toBase64, toText, toCSVJson, byteFormat } = useUtils();

  const handleOnChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = [...e.target?.files];
      if (acceptFileRegex.test(files[0]?.type || "")) {
        if ((files[0]?.size || 0) > size)
          setErrorCallback(
            `Upload limit maximum ${byteFormat(size, 2)} allowed`
          );
        else {
          if (files[0]) {
            setImageSrc(files[0]);
            setFileCallback(files[0]);
          }
        }
      } else setErrorCallback(`Only ${accept} files allowed`);
    },
    []
  );

  const handleClearImageSrc = () => {
    setImageSrc(undefined);
    setFileCallback?.(undefined);
  };

  React.useEffect(() => {
    if (imageSrc?.type?.includes("csv"))
      toText(imageSrc as Blob).then((res) => setImage(res as string));
    else toBase64(imageSrc as Blob).then((res) => setImage(res as string));
    return () => setImage("");
  }, [imageSrc]);

  return (
    <Mui.Box
      sx={{
        position: "relative",
        height: "fit-content",
        width: "fit-content",
      }}
    >
      <input
        hidden
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
            display: imageSrc?.type?.includes("pdf") ? "flex" : "none",
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
        {imageSrc?.type?.includes("csv") ? (
          <Mui.TableContainer
            sx={{
              height: 100,
              width: 100,
              alignSelf: "center",
              objectFit: image ? "cover" : "contain",
              boxShadow: `0 0 1px ${Mui.colors.grey[500]}`,
              backgroundColor: Mui.colors.grey[100],
              ...sx,
            }}
          >
            {image && toCSVJson(image)?.[0] ? (
              <Mui.Table size="small">
                <Mui.TableHead>
                  {Object.keys(toCSVJson(image)?.[0]).map((title) => (
                    <Mui.TableCell>{title.toUpperCase()}</Mui.TableCell>
                  ))}
                </Mui.TableHead>
                <Mui.TableBody>
                  {toCSVJson(image).map((data) => (
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
            data={image ? image : ""}
            sx={{
              height: 100,
              width: 100,
              alignSelf: "center",
              objectFit: image ? "cover" : "contain",
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
  );
};

export declare namespace previewFile {
  export interface props {
    name: string;
    accept: string;
    size: number;
    setErrorCallback: (error: string) => void;
    setFileCallback: (file: File | undefined) => void;
    sx?: Mui.SxProps;
  }
}
