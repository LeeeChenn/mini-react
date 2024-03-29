import React from "./core/React.js";

let fooCount = 0;
function Foo() {
    console.log('foo update')
    const update = React.update();
    function handleClick() {
        console.log('foo click')
        fooCount++;
        update()
    }
    return (
        <div>
            foo: {fooCount}
            <button onClick={handleClick}>click</button>
        </div>
    )
}

let barCount = 0
function Bar() {
    console.log('bar update')
    const update = React.update();
    function handleClick() {
        console.log('bar click')
        barCount++;
        update()
    }
    return (
        <div>
            bar: {barCount}
            <button onClick={handleClick}>click</button>
        </div>
    )
}

let appCount = 0;
function App() {
    console.log('app update')
    const update = React.update();
    function handleClick() {
        console.log('app click')
        appCount++;
        update()
    }
    return (
        <div id="app">
            app: {appCount}
            <button onClick={handleClick}>click</button>
            <Foo></Foo>
            <Bar></Bar>
        </div>
    )
}

export default App;