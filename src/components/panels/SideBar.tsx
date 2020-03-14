import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { panelStore } from '../../mobx/Store';

import { styles } from '../../style/style';

const SideBar = observer(() => {
    const classes = styles();
    const store = useContext(panelStore);

    let toggle = store.show;

    return (
        <div className={classes.sideBar + ' ' + (toggle ? classes.show : classes.hide)} >
            {store.getComponent()}
        </div>
    );
});

export default SideBar;