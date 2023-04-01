import React from "react";
import * as Mui from "@mui/material";
import { useUtils } from "../utils/use-utils";
import { PreviewFile } from "../../components/global/preview-file";

export const CsvToJson = () => {
  const [fileText, setFile] = React.useState("");
  const { toCSVJson, toText } = useUtils();

  return (
    <Mui.Stack spacing={2}>
      <PreviewFile
        name="csvtojson"
        accept="text/csv"
        size={2097152}
        sx={{ height: 200, width: 400 }}
        setErrorCallback={console.log}
        setFileCallback={(_file) =>
          _file && toText(_file).then((res) => setFile(res as string))
        }
      />
      <Mui.Typography variant="body1">
        Converted CSV JSON :<br />
      </Mui.Typography>
      <Mui.Box
        component="pre"
        sx={{ bgcolor: Mui.colors.grey[300], borderRadius: 2, p: 2 }}
      >
        {fileText && JSON.stringify(toCSVJson(fileText), null, 4)}
      </Mui.Box>
    </Mui.Stack>
  );
};
