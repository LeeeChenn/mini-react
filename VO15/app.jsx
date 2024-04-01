import React from "./core/React.js";

function Foo() {
    const [count, setCount] = React.useState(10);
    const [bar, setBar] = React.useState('bar');
    console.log('foo')
    function handleClick() {
        // setCount((c) => c + 1);
        setBar('barbar');
    }
    return (
        <div>
            <h1>foo</h1>
            {count}
            <div>{bar}</div>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

function App() {
    return (
        <div id="app">
            mini-react
            <Foo></Foo>
        </div>
    )
}

export default App;