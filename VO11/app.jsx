import React from "./core/React.js";

let show = false;
function Foo() {
    const bar = <div>bar</div>
    return (
        <div>
            foo -
            <div>one</div>
            {show && bar}
        </div>
    )
}

function App() {
    return (
        <div id="app">
            mini react
            <Foo></Foo>
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