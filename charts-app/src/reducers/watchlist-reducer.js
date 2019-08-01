const watchlistReducer = (state = { cartTotal: '500', checkboxSelectionList: [] }, action) => {
    switch (action.type) {
        case 'UPDATE_TOTAL': {
            const newState = Object.assign({ test: 'test-item' }, state);
            newState.cartTotal = Number(newState.cartTotal) + 100;
            return newState;
        }
        case 'CHECKBOX_SELECTION_LIST': return {
            ...state,
            checkboxSelectionList: action.data
        }

        default: return state;
    }
}


export default watchlistReducer;