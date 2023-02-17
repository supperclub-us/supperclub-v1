import React from "react";
import { LinearProgress } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        height: "100%",
        flex: "1",
        background: "#252b3d",
      }}
    >
      <LinearProgress />
    </div>
  );
};

export default Loading;
