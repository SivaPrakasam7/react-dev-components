import * as Mui from "@mui/material";
import * as React from "react";

export const Timer = ({ time, children, increase, ...props }: timer.props) => {
  const [timeRemain, setTimeRemian] = React.useState("00:00:00");

  React.useEffect(() => {
    const id = setInterval(() => {
      const difference = increase
        ? new Date().getTime() - new Date(time).getTime()
        : new Date(time).getTime() - new Date().getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const min = Math.floor((difference / 1000 / 60) % 60);
      const sec = Math.floor((difference / 1000) % 60);
      if (difference > 0)
        setTimeRemian(
          days
            ? `${days} ${days < 2 ? "Day" : "Days"}, ${hrs}:${min}:${sec}`
            : hrs
            ? `${hrs}:${min}:${sec}`
            : `${min}:${sec}`
        );
      else clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [time, increase]);

  return (
    <Mui.Typography {...props}>
      {timeRemain === "00:00:00" ? null : children}
      {timeRemain === "00:00:00" ? "Time Out" : timeRemain}
    </Mui.Typography>
  );
};

export declare namespace timer {
  export type props = Mui.TypographyProps & custom;
  export interface custom {
    time: string | number;
    increase?: boolean;
  }
}
