export default function createStore(reducer, initialState)
{
    let currentReducer = reducer;
    let currentState = initialState;
    let isDispatching = false;

    const getState = () => {
        return currentState;
    };

    const dispatch = (action) => {
        try {
            isDispatching = true
            currentState = currentReducer(action);
        } finally {
            isDispatching = false;
        }

        return action;
    };

    const subscribe = () => {

    };

    return {
        dispatch,
        getState,
        subscribe
    }
}