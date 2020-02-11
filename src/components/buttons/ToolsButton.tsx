import React from "react";

import { buttons } from "../../style/style";

const ToolsButton = (props: { icon: any }) => {
    const classes = buttons();

    return (
        <div className={classes.toolsButton}>
            <img src={props.icon} alt={''} />
        </div>
    );
};

export default ToolsButton;
