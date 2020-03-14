import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { panelStore } from '../../mobx/Store';

import { buttons } from "../../style/style";

const ToolsButton = observer((props: { Id: string, icon: string, component: JSX.ElementAttributesProperty }) => {
    const store = useContext(panelStore);
    const classes = buttons();

    return (
        <button onClick={() => { store.toggle(props.Id); store.setComponent(props.component) }} className={classes.toolsButton + ' ' + props.icon} />
    );
});

export default ToolsButton;
