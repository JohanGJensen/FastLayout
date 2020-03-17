import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { sidePanelStore, toolStore } from '../../store/Store';

import { buttons } from "../../style/style";

const ToolsButton = observer((props: { Id: string, canvasNode: boolean, icon: string, component: JSX.ElementAttributesProperty }) => {
    const pStore = useContext(sidePanelStore);
    const tStore = useContext(toolStore);
    const classes = buttons();

    const onClick = () => {
        pStore.toggleSidebar(props.Id, props.canvasNode);
        pStore.setComponent(props.component);

        tStore.setCurrentTool(props.Id);
    }

    return (
        <button title={props.Id} onClick={() => onClick()} className={classes.toolsButton + ' ' + props.icon} />
    );
});

export default ToolsButton;
