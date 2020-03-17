import React, { useLayoutEffect, useContext } from "react";
import { observer } from 'mobx-react-lite';
// import Konva from "konva";

import { styles } from "../../style/style";

import { konvaStore, toolStore } from '../../store/Store';

const Canvas = observer(() => {
    const kStore = useContext(konvaStore);
    const tStore = useContext(toolStore);
    const classes = styles();

    useLayoutEffect(() => {
        kStore.stage.add(kStore.layer);
        kStore.layer.draw();
    });

    const onDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    const onDrop = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let stage = kStore.stage;
        let layer = kStore.layer;

        if (!stage || !layer) return;

        const image = kStore.imageObject;

        const konvaImage = kStore.getImageNode();
        const imageObj = new Image();

        imageObj.onload = function () {
            konvaImage.image(imageObj);
            layer.draw();
        };
        imageObj.src = image.src;

        layer.add(konvaImage);

        kStore.setImageObject({
            id: null,
            src: '',
            alt: '',
            width: 0,
            height: 0,
        });
    }

    const onClick = () => {
        let stage = kStore.stage;
        let layer = kStore.layer;

        if (!stage || !layer) return;

        if (tStore.currentTool === 'text') {

            const textNode = kStore.getTextNode();

            kStore.setTextNode(stage, layer, textNode);

            tStore.setCurrentTool(null);
        }
    }

    return <div
        onClick={() => onClick()}
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e)}
        className={'canvas-container ' + classes.Canvas}
        id="Canvas" />;
});

export default Canvas;
