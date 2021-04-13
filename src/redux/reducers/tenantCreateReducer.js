let defaultState = {
    tenantId: 0,
    tenantName: "",
    accountType: "",
    settings: {},
};

const tenantCreateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "TENANTCREATE":
            return {
                ...state,
                tenantId: action.payload.tenantId,
                tenantName: action.payload.tenantName,
                accountType: action.payload.accountType,
                settings: action.payload.settings,
            };
        default:
            return state;
    }
};

export default tenantCreateReducer;
