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

function updateProps(dom, nextProps, prevProps) {
    // Object.keys(nextProps).forEach(key => {
    //     if (key !== 'children') {
    //         if (key.startsWith('on')) {
    //             let type = key.slice(2).toLowerCase();
    //             dom.addEventListener(type, nextProps[key]);
    //         } else {
    //             dom[key] = nextProps[key];
    //         }
    //     }
    // })

    // 1. old 有 new 没有 删除
    Object.keys(prevProps).forEach(key => {
        if (key !== 'children') {
            if (!(key in nextProps)) {
                dom.removeAttribute(key)
            }
        }
    })
    // 2. new 有 old 没有 添加
    // 3. new 有 old 有 修改
    Object.keys(nextProps).forEach(key => {
        if (key !== 'children') {
            if (nextProps[key] !== prevProps[key]) {
                if (key.startsWith('on')) {
                    let type = key.slice(2).toLowerCase();
                    dom.removeEventListener(type, prevProps[key]);
                    dom.addEventListener(type, nextProps[key]);
                } else {
                    dom[key] = nextProps[key];
                }
            }
        }
    })
}

function reconcileChildren(fiber, children) {
    let oldFiber = fiber.alternate?.child;
    let prevChild = null;
    children.forEach((child, index) => {
        const isSameType = oldFiber && oldFiber.type === child.type;
        let newFiber;
        if (isSameType) {
            // update
            newFiber = {
                ...child,
                parent: fiber,
                sibling: null,
                dom: oldFiber.dom,
                child: null,
                effectTag: "update",
                alternate: oldFiber
            }
        } else {
            newFiber = {
                ...child,
                parent: fiber,
                sibling: null,
                dom: null,
                child: null,
                effectTag: "placement"
            }
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        
        if (index === 0) {
            fiber.child = newFiber;
        } else {
            prevChild.sibling = newFiber;
        }
        prevChild = newFiber;
    })
}

function updateFunctionComponent(fiber) {
    reconcileChildren(fiber, [fiber.type(fiber.props)]);
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        const dom = (fiber.dom = createDom(fiber.type))
        updateProps(dom, fiber.props, {});
    }

    reconcileChildren(fiber, fiber.props.children);
}

function performFiberOfUnit(fiber) {
    let isFunctionComponent = typeof fiber.type === 'function'

    if (isFunctionComponent) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber);
    }

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

// work in progress
let wipRoot = null;
let currentRoot = null;
let nextFiberOfUnit = null;
function fiberLoop(deadline) {
    let shouldYeild = false;
    while (!shouldYeild && nextFiberOfUnit) {
        shouldYeild = deadline.timeRemaining() < 1;
        nextFiberOfUnit = performFiberOfUnit(nextFiberOfUnit);
    }

    if (!nextFiberOfUnit && wipRoot) {
        // 统一提交
        submitRoot()
    }

    if (nextFiberOfUnit) {
        requestIdleCallback(fiberLoop);
    }
}

function submitRoot() {
    submitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}

function submitWork(fiber) {
    if (!fiber) return;
    
    if (fiber.effectTag === 'update') {
        updateProps(fiber.dom, fiber.props, fiber.alternate?.props)
    } else if (fiber.effectTag === 'placement') {
        if (fiber.dom) {
            let parent = fiber.parent;
            while (!parent.dom) {
                parent = parent.parent;
            }
            parent.dom.append(fiber.dom);
        }
    }

    submitWork(fiber.child);
    submitWork(fiber.sibling);
}

function render(el, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [el]
        }
    }

    nextFiberOfUnit = wipRoot; 
    requestIdleCallback(fiberLoop);
}

function update() {
    wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot
    }
    
    nextFiberOfUnit = wipRoot; 
    requestIdleCallback(fiberLoop);
}


const React = {
    update,
    render, 
    createElement
}

export default React;