import React from "react";

import ToolsPanel from "./panels/ToolsPanel";
import SideBar from "./panels/SideBar";
import Canvas from "./canvas/Canvas";

import { styles } from "../style/style";

const Container = () => {
  const classes = styles();

  return (
    <div id="container" className={classes.App}>
      <ToolsPanel />
      <SideBar />
      <Canvas />
    </div>
  );
};

export default Container;
