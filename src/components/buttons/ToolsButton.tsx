import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { panelStore } from '../../mobx/panelStore';

import { buttons } from "../../style/style";

const ToolsButton = observer((props: { icon: string }) => {
    const store = useContext(panelStore);
    const classes = buttons();

    return (
        <button onClick={() => { store.toggle() }} className={classes.toolsButton + ' ' + props.icon} />
    );
});

export default ToolsButton;
