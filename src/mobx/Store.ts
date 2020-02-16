import { createContext } from "react";
import { observable } from 'mobx';

interface state {
    show: boolean,
    toggle(): boolean,
}

class PanelStore {
    @observable
    show: boolean = false
    @observable
    component: null | JSX.ElementAttributesProperty = null

    setComponent = (newComponent: JSX.ElementAttributesProperty) => {
        this.component = newComponent;
    }

    getComponent = () => {
        return this.component;
    }

    toggle = () => {
        this.show = !this.show
    }
}

export const initialState: state = {
    show: false,
    toggle: function () {
        this.show = !this.show;
        return this.show;
    }
};

// export function reducer(state: any, action: any) {
//     switch (action.type) {
//         case 'toggle':
//             return { show: !state.show };
//         default:
//             throw new Error();
//     }
// }

// function Counter() {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     return (
//         <>
//         Count: { state.count }
//     <button onClick={ () => dispatch({ type: 'decrement' }) }> -</button>
//         < button onClick = {() => dispatch({ type: 'increment' })
// }> +</button>
//     < />
//   );
// }

// const sidebarstore = {
//     title: 'FastLayout',
//     left: '0px',
//     show: false,
//     toggle() {
//         this.show = !this.show
//     }
// }

export const panelStore = createContext(new PanelStore());