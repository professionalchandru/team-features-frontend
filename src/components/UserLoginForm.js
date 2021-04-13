import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const UserLoginForm = ({ email, password, handleChange, loginUser }) => {
    let history = useHistory();
    return (
        <>
            <TextField
                label="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Pasword"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
            />
            <br />
            <br />
            <Button
                className="login-btn"
                color="secondary"
                variant="contained"
                style={{
                    backgroundColor: "brown",
                    marginRight: "5px",
                }}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button
                className="login-btn"
                color="primary"
                variant="contained"
                type="submit"
                onClick={loginUser}
            >
                Login
            </Button>
        </>
    );
};

export default UserLoginForm;
