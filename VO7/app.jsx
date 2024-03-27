import React from "./core/React.js";

// use React.createElement func
// const App =  React.createElement("div", {id: "app", style: "color: red;"}, "app");

// jsx

function Counter() {
    function handleClick() {
        console.log('click')
    }
    return (
        <div>
            <button onClick={handleClick}>click</button>
        </div>
    )
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
            <Counter></Counter>
        </div>
    )
}

export default App;