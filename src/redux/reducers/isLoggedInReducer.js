let defaultState = {
    user: {},
    tenantId: 0,
    token: "",
    isLoggedIn: false,
};

const isLoggedInReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                tenantId: action.payload.tenantId,
                isLoggedIn: true,
                token: action.payload.token,
            };
        case "USERLOGIN":
            return {
                ...state,
                user: action.payload.user,
                tenantId: action.payload.tenantId,
                isLoggedIn: true,
                token: action.payload.token,
            };

        case "USERLOGOUT":
            return {
                ...state,
                user: {},
                tenantId: 0,
                isLoggedIn: false,
                token: "",
            };
        default:
            return state;
    }
};

export default isLoggedInReducer;
