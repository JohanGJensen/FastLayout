import { createUseStyles } from "react-jss";
import { iconBurger, iconImage, iconCanvas, iconShape, iconText } from '../assets/images/images';

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
        'z-index': '10',

        'width': '100%',
        'height': '45px',
        "border-bottom": 'solid 0.1px #000000',

        'background': '#FFFFFF',
    },
    sideBar: {
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'space-between',
        'position': 'absolute',
        'top': '0px',

        'height': '100vh',
        'width': '200px',
        'background': '#FFFFFF',
        // 'padding-top': '70px',
        "border-right": 'solid 0.1px #000000',

        'transition': 'all 0.1s ease-out',
    },
    show: {
        'left': '0px',
    },
    hide: {
        'left': '-201px',
    }
});

export const buttons = createUseStyles({
    toolsButton: {
        'width': '45px',
        'height': '45px',

        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',

        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background': 'none',
        'color': 'inherit',
        'border': 'none',
        'padding': '0',
        'cursor': 'pointer',
        '&:focus': {
            'border': 'none',
            'outline': 'none !important',
        },
        '&::-moz-focus-inner': {
            'border': '0',
        }
    },
    iconBurger: {
        'background-image': 'url(' + iconBurger + ')',
    },
    iconImage: {
        'background-image': 'url(' + iconImage + ')',
    },
    iconCanvas: {
        'background-image': 'url(' + iconCanvas + ')',
    },
    iconShape: {
        'background-image': 'url(' + iconShape + ')',
    },
    iconText: {
        'background-image': 'url(' + iconText + ')',
    },
});