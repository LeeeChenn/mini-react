import React from "./core/React.js";

function Foo() {
    const [count, setCount] = React.useState(10);
    const [bar, setBar] = React.useState('bar');
    console.log('foo')
    function handleClick() {
        setCount((c) => c + 1);
    }
    function handleClickBar() {
        setBar((c) => c + 'bar');
    }

    React.useEffect(() => {
        console.log('init')
        return () => {
            console.log('clean up 1')
        }
    }, [])

    React.useEffect(() => {
        console.log('update 2')
        return () => {
            console.log('clean up 2')
        }
    }, [count])

    React.useEffect(() => {
        console.log('update 3')
        return () => {
            console.log('clean up 3')
        }
    }, [bar])

    return (
        <div>
            <h1>foo</h1>
            {count}
            <div>{bar}</div>
            <button onClick={handleClick}>click</button>
            <div></div>
            <button onClick={handleClickBar}>click bar</button>
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