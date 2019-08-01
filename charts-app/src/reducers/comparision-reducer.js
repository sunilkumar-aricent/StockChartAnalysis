const comparisionReducer = (state = { compareList : [] }, action) => {
    switch(action.type) {
        case 'UPDATE_TOTAL': {
            const newState = Object.assign({ test: 'test-item' }, state);
            newState.cartTotal = Number(newState.cartTotal) + 100;
            return newState;
        }
        case 'COMPARE_LIST':
                return {
                    ...state,
                    compareList : action.data
                }
        default: return state;
    }
}

export default comparisionReducer;
