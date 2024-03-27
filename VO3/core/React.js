function createTextNode(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createElement(type, props, ...children) {
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

function createDom(type) {
    return type === 'TEXT_ELEMENT' ?  
        document.createTextNode("")
        : document.createElement(type);
}

function updateProps(dom, props) {
    Object.keys(props).forEach(key => {
        if (key !== 'children') {
            dom[key] = props[key];
        }
    })
}

function initChildren(fiber) {
    let children = fiber.props.children;
    let prevChild = null;
    children.forEach((child, index) => {
        const newFiber = {
            ...child,
            parent: fiber,
            sibling: null,
            dom: null,
            child: null,
        }
        if (index === 0) {
            fiber.child = newFiber;
        } else {
            prevChild.sibling = newFiber;
        }
        prevChild = newFiber;
    })
}

function performFiberOfUnit(fiber) {
    if (!fiber.dom) {
        const dom = (fiber.dom = createDom(fiber.type))

        fiber.parent.dom.append(dom);
        updateProps(dom, fiber.props);
    }

    initChildren(fiber);
    

    // 返回下一要执行的任务
    if (fiber.child) {
        return fiber.child;
    }  

    if (fiber.sibling) {
        return fiber.sibling;
    } 
    let parent = fiber.parent;
    while (parent && parent.sibling === null) {
        parent = parent.parent;
    }
    return parent?.sibling;
}

let nextFiberOfUnit = null;
function fiberLoop(deadline) {
    let shouldYeild = false;
    while (!shouldYeild && nextFiberOfUnit) {
        shouldYeild = deadline.timeRemaining() < 1;
        nextFiberOfUnit = performFiberOfUnit(nextFiberOfUnit);
    }
    if (nextFiberOfUnit) {
        requestIdleCallback(fiberLoop);
    }
}

function render(el, container) {
    nextFiberOfUnit = {
        dom: container,
        props: {
            children: [el]
        }
    }
    requestIdleCallback(fiberLoop);
}

const React = {
    render, 
    createElement
}

export default React;