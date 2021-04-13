let defaultState = {
    userName: "",
    email: "",
    userId: "",
    tenantId: 0,
    userType: "",
};

const userCreateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "USERCREATE":
            return {
                ...state,
                tenantId: action.payload.tenantId,
                userName: action.payload.userName,
                email: action.payload.email,
                userId: action.payload.userId,
                userType: action.payload.userType,
            };
        default:
            return state;
    }
};

export default userCreateReducer;
