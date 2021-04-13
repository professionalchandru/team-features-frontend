export const userCreate = (payload) => {
    return {
        type: "USERCREATE",
        payload: payload,
    };
};

export const userLogin = (payload) => {
    return {
        type: "USERLOGIN",
        payload: payload,
    };
};

export const userLogout = () => {
    return {
        type: "USERLOGOUT",
        // payload: payload,
    };
};
