import React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useUtils } from "../utils/use-utils";

export const JsonToCSV = ({
  fileName,
  title,
  data,
}: {
  fileName: string;
  title: string;
  data: Record<string, string | React.ReactNode | number>[];
}) => {
  const { toCSVFile } = useUtils();

  return (
    <Mui.Stack spacing={2}>
      <Mui.Typography variant="body1">
        Click to download converted CSV file :{" "}
        <Mui.IconButton href={toCSVFile(title, data)} download={fileName}>
          <MuiIcons.Download />
        </Mui.IconButton>
      </Mui.Typography>
    </Mui.Stack>
  );
};
