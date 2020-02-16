interface action {
    type: string
}

interface sidepanel {
    title: string,
    left: string,
    show: boolean,
    toggle: any
}

export const initialState = {
    title: 'FastLayout',
    left: '0px',
    show: false,
    toggle() {
        this.show = !this.show
    }
};

export function reducer(state = initialState, action: action) {
    switch (action.type) {
        case 'toggle':
            return { show: !state.show };
        default:
            throw new Error();
    }
}