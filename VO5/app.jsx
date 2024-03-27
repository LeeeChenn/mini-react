import React from "./core/React.js";

// use React.createElement func
// const App =  React.createElement("div", {id: "app", style: "color: red;"}, "app");

// jsx

function Counter({num}) {
    return <div>count: {num}</div>
}


// const App = (
//     <div id="app">
//         Mini React
//         <Counter num={10}></Counter>
//     </div>
// )

function App() {
    return (
        <div id="app">
            Mini React
            <Counter num={11}></Counter>
            <Counter num={20}></Counter>
            <div>sub<span> span</span></div>
        </div>
    )
}

export default App;