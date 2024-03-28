import React from "./core/React.js";

let count = 1;
function Counter() {
    function handleClick() {
        count++;
        React.update();
    }
    console.log('counter called')
    return (
        <div>
            count: {count}
            <button onClick={handleClick}>click</button>
        </div>
    )
}

function App() {
    function handleClick() {
        count++;
        React.update();
    }
    return (
        <div id="app">
            count: {count}
            <button onClick={handleClick}>click it</button>
            {/* Mini React */}
            {/* <Counter></Counter> */}
        </div>
    )
}

// 失败，没有使用 jsx，不会调用 createElement
// function handleClick() {
//     count++;
//     React.update();
// }

// const App = (
//     <div id="app">
//         count: {count}
//         <button onClick={handleClick}>click</button>
//     </div>
// )

export default App;