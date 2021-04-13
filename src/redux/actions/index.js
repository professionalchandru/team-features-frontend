export const login = (payload) => {
    return {
        type: "LOGIN",
        payload: payload,
    };
};

export const logout = (payload) => {
    return {
        type: "LOGOUT",
        payload: payload,
    };
};
