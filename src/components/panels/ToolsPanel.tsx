import React from "react";
// import Konva from "konva";

import ToolsButton from '../buttons/ToolsButton';

import MenuSideBar from './MenuSideBar';
import ImagesSideBar from './ImagesSideBar';
import ShapeSideBar from './ShapeSideBar';
import TextSideBar from './TextSideBar';
import CanvasSideBar from './CanvasSideBar';

import { styles, buttons } from "../../style/style";

const ToolsPanel = () => {
  const classes = styles();
  const button = buttons();

  return (
    <div id="drag-items" className={'tools-panel ' + classes.toolsPanel}>
      <ToolsButton Id={'menu'} icon={button.iconBurger} component={MenuSideBar()} />
      <ToolsButton Id={'image'} icon={button.iconImage} component={ImagesSideBar()} />
      <ToolsButton Id={'shape'} icon={button.iconShape} component={ShapeSideBar()} />
      <ToolsButton Id={'text'} icon={button.iconText} component={TextSideBar()} />
      <ToolsButton Id={'canvas'} icon={button.iconCanvas} component={CanvasSideBar()} />
    </div>
  );
};

export default ToolsPanel;
