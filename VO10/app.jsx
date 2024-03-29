import React from "./core/React.js";

let show = true;
function Foo() {
    const bar = <div>bar</div>
    const doo = (
        <div>
            doo
            <div>children1</div>
            <div>children2</div>
        </div>
    )

    function handleClick() {
        show = !show;
        console.log('click: ' + show)
        React.update();
    }

    return (
        <div>
            foo -
            <div>{show ? bar : doo}</div>
            <button onClick={handleClick}>click</button>
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