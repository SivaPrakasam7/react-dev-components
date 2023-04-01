import React from "react";
import * as Mui from "@mui/material";
import { useUtils } from "../utils/use-utils";

export const EncodeDecodeDemo = ({
  value,
  mode,
}: {
  value: string;
  mode: "encode" | "decode";
}) => {
  const { encode, decode } = useUtils();

  return (
    <Mui.Stack spacing={2}>
      <Mui.Typography variant="body1">
        Result : {mode === "encode" ? encode(value) : decode(value)}
      </Mui.Typography>
    </Mui.Stack>
  );
};
