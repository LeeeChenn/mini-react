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
            children: children.map(child => {
                // 参数修改
                let isText = typeof child === 'string' || typeof child === 'number';
                return isText ? createTextNode(child) : child
            })
        }
    }
}

function createDom(type) {
    return type === 'TEXT_ELEMENT' ?  
        document.createTextNode("")
        : document.createElement(type);
}

function updateProps(dom, props) {
    Object.keys(props).map(key => {
        if (key !== 'children') {
            dom[key] = props[key];
        }
    })
}

function initChildren(fiber, children) {
    let prevChild = null;
    children.forEach((child, index) => {
        let newFiber = {
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
    let isFunctionComponent = typeof fiber.type === 'function'

    if (!fiber.dom && !isFunctionComponent) {
        const dom = (fiber.dom = createDom(fiber.type))
        updateProps(dom, fiber.props);
    }

    let children = isFunctionComponent ? [fiber.type(fiber.props)] : fiber.props.children;

    initChildren(fiber, children);
    

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
let root = null;
function fiberLoop(deadline) {
    let shouldYeild = false;
    while (!shouldYeild && nextFiberOfUnit) {
        shouldYeild = deadline.timeRemaining() < 1;
        nextFiberOfUnit = performFiberOfUnit(nextFiberOfUnit);
    }

    if (!nextFiberOfUnit && root) {
        // 统一提交
        submitAll()
    }

    if (nextFiberOfUnit) {
        requestIdleCallback(fiberLoop);
    }
}

function submitAll() {
    submitWork(root);
}

function submitWork(fiber) {
    if (!fiber) return;
    if (fiber.dom) {
        let parent = fiber.parent;
        while (!parent.dom) {
            parent = parent.parent;
        }
        parent.dom.appendChild(fiber.dom);
    }
    submitWork(fiber.child);
    submitWork(fiber.sibling);
}

function render(el, container) {
    nextFiberOfUnit = {
        parent: {dom: container},
        ...el
    }

    root = nextFiberOfUnit;
    requestIdleCallback(fiberLoop);
}



const React = {
    render, 
    createElement
}

export default React;