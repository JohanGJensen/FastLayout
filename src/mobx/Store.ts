import { createContext } from "react";
import Konva from 'konva';
import { observable } from 'mobx';

export interface imageObject {
    id: number | null,
    src: string,
    alt: string,
    width: number,
    height: number,
}

class KonvaStore {
    @observable
    stage: Konva.Stage = new Konva.Stage({
        container: "App",
        width: 500,
        height: 500
    });

    @observable
    layer: Konva.Layer = new Konva.Layer();

    setStage = (stage: Konva.Stage) => {
        this.stage = stage;
    }

    setLayer = (layer: Konva.Layer) => {
        this.layer = layer;
    }

    draggedImage: imageObject = {
        id: null,
        src: '',
        alt: '',
        width: 0,
        height: 0
    };

    setDraggedImage = (image: imageObject) => {
        this.draggedImage = image;
    }
}

class PanelStore {
    @observable
    show: boolean = false
    @observable
    component: null | JSX.ElementAttributesProperty = null
    @observable
    componentId: string = ''

    setComponent = (newComponent: JSX.ElementAttributesProperty) => {
        this.component = newComponent;
    }

    getComponent = () => {
        return this.component;
    }

    toggle = (id: string) => {
        if (!id) id = this.componentId;

        if (this.componentId === '' || this.componentId !== id) {
            this.show = true;
            this.componentId = id;
        } else {
            this.show = false;
            this.componentId = '';
        }
    }
}

export const konvaStore = createContext(new KonvaStore());
export const panelStore = createContext(new PanelStore());