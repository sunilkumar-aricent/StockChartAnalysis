const initialState = { showLoader: false, compareList : [] }

const commonReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_LOADER': {
            const newState = Object.assign({}, state);
            newState.showLoader = true;
            return newState;
        }
        case 'HIDE_LOADER': {
            const newState = Object.assign({}, state);
            newState.showLoader = false;
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

export default commonReducer;
