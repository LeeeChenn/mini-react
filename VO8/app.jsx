import React from "./core/React.js";

let count = 1;
let props = {id: '1111'}
function Counter() {
    function handleClick() {
        count++;
        props = {}
        console.log('click ' + count)
        React.update();
    }
    return (
        <div {...props}>
            count: {count}
            <button onClick={handleClick}>click</button>
        </div>
    )
}

function App() {
    return (
        <div id="app">
            Mini React
            <Counter></Counter>
        </div>
    )
}

export default App;