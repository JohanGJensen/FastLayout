import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { panelStore } from '../../mobx/panelStore';

import { styles } from '../../style/style'

const SidePanel = observer(() => {
    const classes = styles();
    const store = useContext(panelStore);

    let toggle = store.show;

    return (
        <div className={classes.sidePanel + ' ' + (toggle ? classes.show : classes.hide)} />
    );
});

export default SidePanel;