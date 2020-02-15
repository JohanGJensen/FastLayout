export const initialState = { left: '0px' };

interface action {
    type: string
}

interface sidepanel {
    left: string
}

export function panelReducer(state: sidepanel, action: action) {
    switch (action.type) {
        case 'show':
            return { left: '0px' };
        case 'hide':
            return { left: '-200px' };
        default:
            throw new Error();
    }
}