import { createUseStyles } from "react-jss";

export const styles = createUseStyles ({
    theme: {
        'padding': 0,
        'margin': 0,
      
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      
        'width': '100vw',
        'height': '100vh',
    },
    App: {
        'font-family': 'sans-serif',
        'text-align': 'center',
      
        'border': '1px solid black',
      
        'height': '500px',
        'width': '500px',
    },
    toolsPanel: {
        'width': '500px',
        'height': '100px',
      
        'background': 'grey',
        'margin': '0 0 20px',
        'border': '1px solid black',
    },
});