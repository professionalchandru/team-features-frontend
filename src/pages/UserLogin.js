import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";
import UserLoginForm from "../components/UserLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/users";

const UserLogin = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        if (user.email && user.password) {
            let loginCredentials = {
                email: user.email,
                password: user.password,
            };
            setIsError(false);
            setError("");
            setIsSuccess(false);
            setSuccess("");
            let response = await axios
                .post(`${baseUrl}/users/login`, loginCredentials)
                .catch((err) => {
                    if (err.response) {
                        setError(err.response.data.error.message);
                        setIsError(true);
                    }
                });
            if (!response) {
                return;
            }
            if (response.data.status !== "success") {
                setError(response.data.message);
                setIsError(true);
            } else {
                setIsError(false);
                setError("");
                setSuccess(response.data.message);
                setIsSuccess(true);
                dispatch(
                    userLogin({
                        user: response.data.user,
                        tenantId: response.data.tenantId,
                    })
                );
                localStorage.setItem(
                    "currentLogIn",
                    JSON.stringify({
                        user: response.data.user,
                        tenantId: response.data.tenantId,
                    })
                );
                history.push(`/${response.data.tenantId}/shops`);
                // history.push(`/dashboard/${response.data.tenantId}`);
            }
        } else {
            setError("please fill all details");
            setIsError(true);
        }
    };

    return (
        <>
            <Container>
                <section className="center-elements">
                    <Typography variant="h4" className="typo">
                        User Login
                    </Typography>
                </section>
                <section className="center-elements" style={{ width: "30%" }}>
                    {isError && (
                        <Alert
                            onClose={() => {
                                setIsError(false);
                            }}
                            severity="error"
                        >
                            {error}
                        </Alert>
                    )}
                    {isSuccess && (
                        <Alert
                            onClose={() => {
                                setIsSuccess(false);
                            }}
                            severity="success"
                        >
                            {success}
                        </Alert>
                    )}
                </section>
                <section className="center-elements">
                    <form>
                        <UserLoginForm
                            {...user}
                            handleChange={handleChange}
                            loginUser={loginUser}
                        />
                        {/* <br />
                        <br />
                        <Typography
                            component={Link}
                            to="/user/create"
                            variant="subtitle1"
                            color="secondary"
                        >
                            User Create
                        </Typography>

                        <br />
                        <br />
                        <Typography
                            component={Link}
                            to="/tenant/create"
                            variant="subtitle1"
                            color="secondary"
                        >
                            Tenant Create
                        </Typography> */}
                    </form>
                </section>
            </Container>
        </>
    );
};

export default UserLogin;
