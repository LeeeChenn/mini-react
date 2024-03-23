function createTextNode(text) {
    console.log('create text node')
    
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createElement(type, props, ...children) {
    console.log('create element')
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === 'string' ? createTextNode(child) : child
            )
        }
    }
}

function render(el, container) {
    const dom = el.type === 'TEXT_ELEMENT' ?  
        document.createTextNode(el.props.nodeValue)
        : document.createElement(el.type);
    container.appendChild(dom);

    Object.keys(el.props).map(key => {
        if (key !== 'children') {
            dom[key] = el.props[key]
        }
    })

    el.props.children.forEach(child => {
        render(child, dom);
    })
}

const React = {
    render, 
    createElement
}

export default React;