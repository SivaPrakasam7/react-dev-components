import React from "react";
import * as Mui from "@mui/material";
import { useUtils } from "../utils/use-utils";

export const FocusElement = ({ id }: { id: string }) => {
  const { toFocus } = useUtils();

  return (
    <Mui.Stack spacing={2}>
      <Mui.Typography variant="body1">
        Click to focus element :{" "}
        <Mui.Button
          variant="contained"
          onClick={() => {
            console.log(`#${id}`, document.getElementById(id));
            toFocus(document.getElementById(id));
          }}
        >
          {id}
        </Mui.Button>
      </Mui.Typography>
      <Mui.Box
        id="box1"
        sx={{ height: 400, width: 400, bgcolor: "primary.main" }}
      ></Mui.Box>
      <Mui.Box
        id="box2"
        sx={{ height: 400, width: 400, bgcolor: "success.main" }}
      ></Mui.Box>
      <Mui.Box
        id="box3"
        sx={{ height: 400, width: 400, bgcolor: "error.main" }}
      ></Mui.Box>
    </Mui.Stack>
  );
};
