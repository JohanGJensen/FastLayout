import React from "react";

import ToolsPanel from "./panels/ToolsPanel";
import Canvas from "./canvas/Canvas";

import { styles } from "../style/style";

const Container = (props: { stage: object, layer: object }) => {
  const classes = styles();

  return (
    <div id="container" className={classes.App}>
      <ToolsPanel stage={props.stage} layer={props.layer} />
      <Canvas stage={props.stage} layer={props.layer} />
    </div>
  );
};

export default Container;
