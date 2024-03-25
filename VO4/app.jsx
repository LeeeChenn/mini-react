import React from "./core/React.js";

// use React.createElement func
// const App =  React.createElement("div", {id: "app", style: "color: red;"}, "app");

// jsx
const App = (
    <div id="app">
        <div>Mini React</div>
        <div>
            <h3>Head 3</h3>
            <div style="color: gray">
                <div>first</div>
                <div>second</div>
            </div>
            <ul>
                <li>Apple</li>
                <li>Orange</li>
                <li>Banana</li>
            </ul>
        </div>
    </div>
);

// const App = (
//     <div id="app">
//         Mini React
//         <div id="2">Context</div>
//     </div>
// )

export default App;