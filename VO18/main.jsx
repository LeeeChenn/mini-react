import ReactDom from "./core/ReactDom.js";
import App from './app.jsx'
// import react, jsx need React.createElement
import React from "./core/React.js";  

ReactDom.createRoot(document.getElementById("root")).render(<App></App>);

