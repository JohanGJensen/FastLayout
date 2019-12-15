import React from "react";

import ToolsPanel from "./panels/ToolsPanel";
import Canvas from "./canvas/Canvas";

const Container = (props: {stage: object, layer: object}) => {
  return (
    <div id="container">
      <ToolsPanel stage={props.stage} layer={props.layer} />
      <Canvas stage={props.stage} layer={props.layer} />
    </div>
  );
};

export default Container;
