import React from "react";
import * as Mui from "@mui/material";
import { useUtils } from "../utils/use-utils";

export const Base64ToFile = ({
  content,
  fileName,
}: {
  content: string;
  fileName: string;
}) => {
  const { useDataURLFile } = useUtils();

  return (
    <Mui.Stack spacing={2}>
      <Mui.Typography variant="body1">
        Converted File : {JSON.stringify(useDataURLFile(content, fileName))}
      </Mui.Typography>
    </Mui.Stack>
  );
};
