const createStore = function (reducer, initialState)
{
    // 内存变量
    let currentReducer = reducer;
    let currentState = initialState;
    let isDispatching = false;
    let currentListener = [];
    let nextListener = currentListener;
    let isSubscribe = false;

    const getState = () => {
        return currentState;
    };

    const dispatch = (action) => {
        try {
            isDispatching = true
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }

        const listener = (currentListener = nextListener);
        for(let i = 0; i < listener.length; i++) {
            listener[i]();
        }
        return action;
    };

    const subscribe = (listener) => {
        isSubscribe = true;
        nextListener.push(listener);

        return function () {
            isSubscribe = false;
        }
    };

    const ActionTypes = {
        INIT:
            '@@redux/INIT' +
            Math.random()
                .toString(36)
                .substring(7)
                .split('')
                .join('.'),
        REPLACE:
            '@@redux/REPLACE' +
            Math.random()
                .toString(36)
                .substring(7)
                .split('')
                .join('.')
    };

    dispatch({ type: ActionTypes.INIT });

    return {
        dispatch,
        getState,
        subscribe
    }
}

export {
    createStore
}

// Q：createStore， 传入 initialState 和 reducer 中设置初始值的区别
// A：传入 initialState， 这样在调用createState就会给内存变量state附上值