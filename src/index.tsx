import React, { } from "react";
import ReactDOM from "react-dom";
import { observer } from 'mobx-react-lite';

import Container from "./components/Container";
import "./style/style.css";

const App = observer(() => {
    return (<Container />);
})

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
