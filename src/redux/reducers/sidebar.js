let defaultState = {
    showManage: false,
    showViewTeam: false,
};

const isLoggedInReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SIDEBAR":
            return {
                ...state,
                showManage: action.payload.showManage,
                showViewTeam: action.payload.showViewTeam,
            };
        default:
            return state;
    }
};

export default isLoggedInReducer;
