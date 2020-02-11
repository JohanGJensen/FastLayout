import React, { useEffect, useState } from "react";
// import { useTheme } from "react-jss";
import ReactDOM from "react-dom";
import Konva from "konva";

import Container from "./components/Container";

import "./style/style.css";
// import { styles } from "./style/style";

function App() {
    // const classes = styles();

    const [konvaStage, setKonvaStage] = useState();
    const [konvaLayer, setKonvaLayer] = useState();

    useEffect(() => {
        var width = 500;
        var height = 500;

        const stage = new Konva.Stage({
            container: "App",
            width: width,
            height: height
        });

        const layer = new Konva.Layer();

        setKonvaStage(stage);
        setKonvaLayer(layer);
    }, []);

    return (<Container stage={konvaStage} layer={konvaLayer} />);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
