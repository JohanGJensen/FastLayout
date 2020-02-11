import { createUseStyles } from "react-jss";

export const styles = createUseStyles({
    theme: {
        // background: '#C9C9C9',
        'width': '100%',
        'height': '100%',
    },
    App: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
    },
    Canvas: {
        'font-family': 'sans-serif',
        'text-align': 'center',

        'background': '#FFFFFF',

        'height': '500px',
        'width': '500px',
    },
    toolsPanel: {
        'display': 'flex',

        'position': 'absolute',
        'top': '0px',

        'width': '100%',
        'height': '45px',

        'background': '#FFFFFF',
        // 'margin': '0 0 20px',
        // 'border': '1px solid black',
    },
});

export const buttons = createUseStyles({
    toolsButton: {
        'width': '45px',
        'height': '45px',

        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
    },
});