import React from "react";

import ToolsPanel from "./ToolsPanel";
import Canvas from "./Canvas";

const Container = (props: {stage: object, layer: object}) => {
  return (
    <div id="container">
      <ToolsPanel stage={props.stage} layer={props.layer} />
      <Canvas stage={props.stage} layer={props.layer} />
      <div className="canvas-container" id="App" />
    </div>
  );
};

export default Container;
