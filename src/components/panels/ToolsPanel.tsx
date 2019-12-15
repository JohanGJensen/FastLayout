import React, { useEffect } from "react";
import Konva from "konva";

const ToolsPanel = (props: {stage: any, layer: any}) => {
  useEffect(() => {
    let stage = props.stage;
    let layer = props.layer;

    if (!stage || !layer) return;

    stage.add(layer);

    var con = stage.container();
    con.addEventListener("dragover", function(e: { preventDefault: () => void; }) {
      e.preventDefault(); // !important
    });

    con.addEventListener("drop", function(e: { preventDefault: () => void; }) {
      e.preventDefault();
      // now we need to find pointer position
      // we can't use stage.getPointerPosition() here, because that event
      // is not registered by Konva.Stage
      // we can register it manually:
      stage.setPointersPositions(e);

      const image = new Konva.Image({
        width: 50,
        height: 50,
        x: 0,
        y: 0,
        draggable: true,
        dragBoundFunc: function(pos) {
          let xPos;
          let yPos;

          if (pos.y < 0) {
            yPos = 0;
          } else if (pos.y > stage.height() - this.getHeight()) {
            yPos = stage.height() - this.getHeight();
          } else {
            yPos = pos.y;
          }

          if (pos.x < 0) {
            xPos = 0;
          } else if (pos.x > stage.width() - this.getWidth()) {
            xPos = stage.width() - this.getWidth();
          } else {
            xPos = pos.x;
          }

          return {
            x: xPos,
            y: yPos
          };
        }
      } as Konva.ImageConfig);

      const imageObj1 = new Image();
      imageObj1.onload = function() {
        image.image(imageObj1);
        layer.draw();
      };
      imageObj1.src = "https://placekitten.com/50/50";
      layer.add(image);
    });
  });

  return (
    <div id="drag-items" className="tools-panel">
      <img src="https://placekitten.com/50/50" alt="cat" draggable="true" />
    </div>
  );
};

export default ToolsPanel;
