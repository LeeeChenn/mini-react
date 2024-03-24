
let taskId = 0;

// 空闲回调函数
// 参数 deadline 是 IdleDeadline 类型，它提供了 timeRemaining() 方法，用来判断用户代理预计还剩余多少闲置时间
function workLoop(deadline) {
    taskId++;

    let shouldYeild = false;
    while(!shouldYeild) {
        // 闲置时间 < 1 结束任务循环
        shouldYeild = deadline.timeRemaining() < 1;
        console.log(`taskId: ${taskId} run task`);
    }
    requestIdleCallback(workLoop);
}

// window.requestIdleCallback() 方法插入一个函数，这个函数将在浏览器空闲时期被调用
requestIdleCallback(workLoop);