import { createContext } from "react";
import { observable } from 'mobx';

class PanelStore {
    @observable
    title = 'FastLayout'

    @observable
    left = '0px'

    @observable
    show = false

    @observable
    toggle = () => {
        this.show = !this.show
    }
}

// const sidebarstore = {
//     title: 'FastLayout',
//     left: '0px',
//     show: false,
//     toggle() {
//         this.show = !this.show
//     }
// }

export const panelStore = createContext(new PanelStore());