import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";
import UserCreateForm from "../components/UserCreateForm";
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from "../redux/actions/users";
import PersistentDrawerLeft from "../components/Drawer";
import permissions from "../utils/permissionConstants";

const AddTeam = ({ addUser }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        permission: [],
    });

    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [options, setOptions] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const tenantId = useSelector((state) => state.tenantCreateReducer.tenantId);
    const tenantId1 = useSelector((state) => state.isLoggedInReducer.tenantId);

    useEffect(() => {
        setOptions(permissions);
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    function onSelect(selectedList, selectedItem) {
        setUser({ ...user, permission: selectedList });
        // setPermissions([...selectedList]);
    }

    function onRemove(selectedList, removedItem) {
        setUser({ ...user, permission: selectedList });
    }

    const createUser = async (e) => {
        e.preventDefault();
        if (
            user.name &&
            user.email &&
            user.password &&
            user.permission.length
        ) {
            let registerCredentials = {
                name: user.name,
                email: user.email,
                password: user.password,
                permission: user.permission,
                tenantId: tenantId ? tenantId : tenantId1,
            };
            console.log(registerCredentials);
            setIsError(false);
            setError("");
            setIsSuccess(false);
            setSuccess("");
            let response = await axios
                .post(`${baseUrl}/users/register`, registerCredentials)
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
                    userCreate({
                        userId: response.data.data.id,
                        userName: response.data.data.name,
                        email: response.data.data.email,
                        userType: response.data.data.userType,
                        tenantId,
                    })
                );
                // history.push("/login/user");
            }
        } else {
            setError("please fill all details");
            setIsError(true);
        }
    };

    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <section className="center-elements">
                    <Typography variant="h4" className="typo">
                        {addUser ? "Add User" : "Create User"}
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
                        <UserCreateForm
                            {...user}
                            handleChange={handleChange}
                            createUser={createUser}
                            addUser={addUser}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            options={options}
                        />
                        <br />
                        <br />
                        {!addUser && (
                            <div>
                                <Typography
                                    component={Link}
                                    to="/user/login"
                                    variant="subtitle1"
                                    color="secondary"
                                >
                                    Already have account? Login
                                </Typography>

                                {/* <br />
                                <br />
                                <Typography
                                    component={Link}
                                    to="/tenant/create"
                                    variant="subtitle1"
                                    color="secondary"
                                >
                                    Tenant Create
                                </Typography> */}
                            </div>
                        )}
                    </form>
                </section>
            </Container>
        </>
    );
};

export default AddTeam;
