import * as Mui from "@mui/material";
import React from "react";
import { Format } from "./formater";
import { useUtils } from "../../hooks/utils/use-utils";

export const StackLabel = ({
  direction,
  title,
  titleColor,
  label,
  labelColor,
  medium,
  node,
  valBold,
  time,
}: stack.Props) => {
  const { formatTimeString } = useUtils();
  return (
    <Mui.Stack
      direction={direction || "column"}
      justifyContent="space-between"
      alignItems={direction === "row" ? "center" : undefined}
      spacing={1}
      width="100%"
    >
      <Mui.Typography
        variant={medium ? "body2" : "caption"}
        color={titleColor || "text.secondary"}
        noWrap
      >
        {title}
      </Mui.Typography>
      <Mui.Typography
        variant="body2"
        color={`${labelColor}.main`}
        // noWrap
        fontWeight={valBold ? "bold" : undefined}
        sx={{ overflow: "visible" }}
      >
        {time ? (
          formatTimeString(label as unknown as string)
        ) : node ? (
          label
        ) : (
          <Format number={label as string} type="number" />
        )}
      </Mui.Typography>
    </Mui.Stack>
  );
};

export declare namespace stack {
  export interface Props {
    direction?: "row" | "column";
    title: string | React.ReactNode;
    titleColor?: string;
    label: string | React.ReactNode;
    labelColor?: string;
    medium?: boolean;
    node?: boolean;
    valBold?: boolean;
    time?: boolean;
  }
}
