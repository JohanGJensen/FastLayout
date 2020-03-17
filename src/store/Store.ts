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
        container: "Canvas",
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

    imageObject: imageObject = {
        id: null,
        src: '',
        alt: '',
        width: 0,
        height: 0
    }

    setImageObject = (image: imageObject) => {
        this.imageObject = image;
    }

    getImageNode = () => {
        const image = this.imageObject;
        const stage = this.stage;

        return new Konva.Image({
            width: image.width,
            height: image.height,
            x: 0,
            y: 0,
            draggable: true,
            dragBoundFunc: function (pos) {
                let xPos;
                let yPos;

                if (pos.y < 0) {
                    yPos = 0;
                } else if (pos.y > stage.height() - this.getHeight()) {
                    yPos = stage.height() - this.getHeight();
                } else {
                    yPos = pos.y;
                }

                if (pos.x < 0) {
                    xPos = 0;
                } else if (pos.x > stage.width() - this.getWidth()) {
                    xPos = stage.width() - this.getWidth();
                } else {
                    xPos = pos.x;
                }

                return {
                    x: xPos,
                    y: yPos
                };
            }
        } as Konva.ImageConfig);
    }

    getTextNode = () => {
        const stage = this.stage;

        return new Konva.Text({
            text: "[Text]",
            x: 50,
            y: 80,
            fontSize: 20,
            fontFamily: "Verdana",
            draggable: true,
            widthText: 200,
            dragBoundFunc: function (pos) {
                let xPos;
                let yPos;

                if (pos.y < 0) {
                    yPos = 0;
                } else if (pos.y > stage.height() - this.getHeight()) {
                    yPos = stage.height() - this.getHeight();
                } else {
                    yPos = pos.y;
                }

                if (pos.x < 0) {
                    xPos = 0;
                } else if (pos.x > stage.width() - this.getWidth()) {
                    xPos = stage.width() - this.getWidth();
                } else {
                    xPos = pos.x;
                }

                return {
                    x: xPos,
                    y: yPos
                };
            }
        } as Konva.TextConfig);
    }

    setTextNode = (stage: Konva.Stage, layer: Konva.Layer, textNode: Konva.Text) => {
        layer.add(textNode);

        var tr = new Konva.Transformer({
            node: textNode,
            enabledAnchors: ["middle-left", "middle-right"],
            // set minimum width of text
            boundBoxFunc: function (oldBox: any, newBox: any) {
                newBox.width = Math.max(30, newBox.width);
                return newBox;
            }
        } as Konva.RectConfig);

        textNode.on("transform", function () {
            // reset scale, so only with is changing by transformer
            textNode.setAttrs({
                width: textNode.width() * textNode.scaleX(),
                scaleX: 1
            });
        });

        layer.add(tr);

        layer.draw();

        textNode.on("dblclick", () => {
            // hide text node and transformer:
            textNode.hide();
            tr.hide();
            layer.draw();

            // at first lets find position of text node relative to the stage:
            var textPosition = textNode.absolutePosition();

            // then lets find position of stage container on the page:
            var stageBox = stage.container().getBoundingClientRect();

            // so position of textarea will be the sum of positions above:
            var areaPosition = {
                x: stageBox.left + textPosition.x,
                y: stageBox.top + textPosition.y
            };

            // create textarea and style it
            const textarea: HTMLTextAreaElement = document.createElement("textarea");
            document.body.appendChild(textarea);

            // apply many styles to match text on canvas as close as possible
            // remember that text rendering on canvas and on the textarea can be different
            // and sometimes it is hard to make it 100% the same. But we will try...
            textarea.value = textNode.text();
            textarea.style.position = "absolute";
            textarea.style.top = areaPosition.y + "px";
            textarea.style.left = areaPosition.x + "px";
            textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
            textarea.style.height =
                textNode.height() - textNode.padding() * 2 + 5 + "px";
            textarea.style.fontSize = textNode.fontSize() + "px";
            textarea.style.border = "none";
            textarea.style.padding = "0px";
            textarea.style.margin = "0px";
            textarea.style.overflow = "hidden";
            textarea.style.background = "none";
            textarea.style.outline = "none";
            textarea.style.resize = "none";
            textarea.style.lineHeight = String(textNode.lineHeight());
            textarea.style.fontFamily = textNode.fontFamily();
            textarea.style.transformOrigin = "left top";
            textarea.style.textAlign = textNode.align();
            textarea.style.color = textNode.fill();
            var rotation = textNode.rotation();
            var transform = "";
            if (rotation) {
                transform += "rotateZ(" + rotation + "deg)";
            }

            // var px = 0;
            // also we need to slightly move textarea on firefox
            // because it jumps a bit
            // var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            // if (isFirefox) {
            //     px += 2 + Math.round(textNode.fontSize() / 20);
            // }
            // transform += "translateY(-" + px + "px)";

            textarea.style.transform = transform;

            // reset height
            textarea.style.height = "auto";
            // after browsers resized it we can set actual value
            textarea.style.height = textarea.scrollHeight + 3 + "px";

            textarea.focus();

            function removeTextarea() {
                if (textarea.parentNode != null) {

                    textarea.parentNode.removeChild(textarea);
                    window.removeEventListener("click", handleOutsideClick);
                    textNode.show();
                    tr.show();
                    tr.forceUpdate();
                    layer.draw();
                }
            }

            function setTextareaWidth(newWidth: number) {
                if (!newWidth) {
                    // set width for placeholder
                    newWidth = textNode.placeholder.length * textNode.fontSize();
                }
                // // some extra fixes on different browsers
                // var isSafari = /^((?!chrome|android).)*safari/i.test(
                //     navigator.userAgent
                // );
                // var isFirefox =
                //     navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
                // if (isSafari || isFirefox) {
                //     newWidth = Math.ceil(newWidth);
                // }

                // var isEdge = document.DOCUMENT_NODE || /Edge/.test(navigator.userAgent);
                // if (isEdge) {
                //     newWidth += 1;
                // }
                textarea.style.width = newWidth + "px";
            }

            textarea.addEventListener("keydown", function (e) {
                // hide on enter
                // but don't hide on shift + enter
                if (e.keyCode === 13 && !e.shiftKey) {
                    textNode.text(textarea.value);
                    removeTextarea();
                }
                // on esc do not set value back to node
                if (e.keyCode === 27) {
                    removeTextarea();
                }
            });

            textarea.addEventListener("keydown", function () {
                var scale = textNode.getAbsoluteScale().x;
                setTextareaWidth(textNode.width() * scale);
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + textNode.fontSize() + "px";
            });

            function handleOutsideClick(e: { target: any; }) {
                if (e.target !== textarea) {
                    textNode.text(textarea.value);
                    removeTextarea();
                }
            }
            setTimeout(() => {
                window.addEventListener("click", handleOutsideClick);
            });
        });
    }
}

class SidePanelStore {
    @observable
    show: boolean = false;
    @observable
    component: null | JSX.ElementAttributesProperty = null;
    @observable
    componentId: string = '';

    setComponent = (newComponent: JSX.ElementAttributesProperty) => {
        this.component = newComponent;
    }

    getComponent = () => {
        return this.component;
    }

    toggleSidebar = (id: string, node: boolean) => {
        // panel should be displayed if: new tool selected - 
        if (!id) id = this.componentId;

        if (this.componentId === '' || this.componentId !== id || node === true) {
            this.show = true;
            this.componentId = id;
        } else {
            this.show = false;
            this.componentId = '';
        }
    }
}

class ToolStore {
    currentTool: string | null = null;

    setCurrentTool = (tool: string | null) => {
        this.currentTool = tool;
    }
}

export const konvaStore = createContext(new KonvaStore());
export const sidePanelStore = createContext(new SidePanelStore());
export const toolStore = createContext(new ToolStore());