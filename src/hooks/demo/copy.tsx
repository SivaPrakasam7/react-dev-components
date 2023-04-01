import React from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useUtils } from "../utils/use-utils";

export const Copy = ({ content }: { content: string }) => {
  const { contentCopy } = useUtils();

  return (
    <Mui.Stack spacing={2}>
      <Mui.Typography variant="body1">
        Click to copy :{" "}
        <Mui.IconButton onClick={(e) => contentCopy(content, e)}>
          <MuiIcons.CopyAll />
        </Mui.IconButton>
      </Mui.Typography>
    </Mui.Stack>
  );
};
