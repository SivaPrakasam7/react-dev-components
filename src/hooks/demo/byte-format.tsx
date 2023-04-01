import React from "react";
import * as Mui from "@mui/material";
import { useUtils } from "../utils/use-utils";

export const ByteFormat = ({ value, fix }: { value: number; fix: number }) => {
  const { byteFormat } = useUtils();

  return (
    <Mui.Stack spacing={2}>
      <Mui.Typography variant="body1">
        Result : {byteFormat(value, fix)}
      </Mui.Typography>
    </Mui.Stack>
  );
};
