import React from "./core/React.js";

function Todo() {
    const [todos, setTodos] = React.useState([]);
    const [filterStatus, setFilter] = React.useState('all');
    
    React.useEffect(() => {
        let item = window.sessionStorage.getItem('todo');
        if (item) {
            let obj = JSON.parse(item); 
            setTodos(obj.todos);
            setFilter(obj.filterStatus)
        }
    }, [])

    function add(context) {
        setTodos(() => [...todos, {
            id: crypto.randomUUID(),
            context: context,
            status: 'active'
        }])
    }
    function save() {
        window.sessionStorage.setItem('todo', JSON.stringify({
            todos,
            filterStatus
        }))
    }
    function remove(id) {
        setTodos(todos.filter(item => item.id !== id))
    }
    function setStatus(id, status) {
        setTodos(todos.map(item => {
            return item.id === id ? {...item, status} : item;
        }))
    }
    function filter(value) {
        setFilter(value)
    }

    return (
        <div>
            <Head {...{add, save, filter, filterStatus}}></Head>
            <List {...{
                list: todos.filter(item => filterStatus === 'all' || item.status === filterStatus), 
                remove, 
                setStatus}}></List>
        </div>
    )
}

function Head({add, save, filter, filterStatus}) {
    let radios = ['all', 'done', 'active'];
    function handleAdd() {
        let context = document.getElementById('context').value;
        if (context) {
            add(context);
            document.getElementById('context').value = '';
        }
    }
    function handleFilter(event) {
        filter(event.target.value)
    }
    return (
        <div>
            <h2>TODOS</h2>
            <div>
                <input id="context"></input>
                <button onClick={handleAdd}>add</button>
            </div>
            <div>
                <button onClick={() => save()}>save</button>
            </div>
            <div id="filter">
                {radios.map(value => {
                    return (
                        <span>
                            <input onClick={handleFilter} type="radio" name="filter" value={value} checked={filterStatus === value}/> 
                            {value}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

function List({list, remove, setStatus}) {
    return (
        <div>
            <ul>
                {list.map(item => {
                    return (
                        <li key={item.id} style={item.status === 'done' ? 'text-decoration: line-through' : ''}>
                            {item.context}
                            <button onClick={() => remove(item.id)}>remove</button>
                            {item.status === 'active' ? 
                            <button onClick={() => setStatus(item.id, 'done')}>done</button> :
                            <button onClick={() => setStatus(item.id, 'active')}>cancel</button>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Todo;