import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";
import AddExistingUser from "../components/AddExistingUser";
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from "../redux/actions/users";
import PersistentDrawerLeft from "../components/Drawer";

const ShopTeamAdd = ({ existingUser }) => {
    const [permission, setPermission] = useState([]);

    const [selectedUser, setSelectedUser] = useState([]);

    const { shopId } = useParams();
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [options, setOptions] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);

    const getUsers = async () => {
        let response = await axios
            .get(`${baseUrl}/users/${tenantId}`)
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.error.message);
                    setIsError(true);
                }
            });
        if (!response) {
            return;
        } else {
            setUsersList(response.data);
        }
    };

    useEffect(async () => {
        await getUsers();
    }, [tenantId]);

    useEffect(() => {
        setOptions([
            { permission: "View All", id: 1, value: "viewAll" },
            { permission: "Add Team", id: 2, value: "addTeam" },
            { permission: "Edit Team", id: 3, value: "editTeam" },
            { permission: "Delete Team", id: 4, value: "deleteTeam" },
            { permission: "Add Shop", id: 5, value: "addShop" },
            { permission: "Edit Shop", id: 6, value: "editShop" },
            { permission: "Delete Shop", id: 7, value: "deleteShop" },
        ]);
    }, []);

    // const handleChange = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setUser({ ...user, [name]: value });
    // };

    function onSelectUser(selectedList, selectedItem) {
        setSelectedUser([...selectedList]);
    }

    function onRemoveUser(selectedList, removedItem) {
        setSelectedUser([...selectedList]);
    }

    function onSelectPermission(selectedList, selectedItem) {
        setPermission([...selectedList]);
    }

    function onRemovePermission(selectedList, removedItem) {
        setPermission([...selectedList]);
    }

    const addExistingUser = async (e) => {
        e.preventDefault();
        if (selectedUser.length && permission.length) {
            let registerCredentials = {
                users: selectedUser,
                permission: permission,
                tenantId,
                shopId: parseInt(shopId),
            };
            setIsError(false);
            setError("");
            setIsSuccess(false);
            setSuccess("");
            let response = await axios
                .post(`${baseUrl}/shop/${shopId}/addTeam/`, registerCredentials)
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
                // dispatch(
                //     userCreate({
                //         userId: response.data.data.id,
                //         userName: response.data.data.name,
                //         email: response.data.data.email,
                //         userType: response.data.data.userType,
                //         tenantId,
                //     })
                // );
                setTimeout(() => {
                    history.goBack();
                }, 3000);
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
                        {existingUser
                            ? "Add Users & Permissions"
                            : "Create User"}
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
                {existingUser && (
                    <section className="center-elements">
                        <form>
                            <AddExistingUser
                                // {...user}
                                // handleChange={handleChange}
                                addExistingUser={addExistingUser}
                                existingUser={existingUser}
                                onSelectPermission={onSelectPermission}
                                onRemovePermission={onRemovePermission}
                                onSelectUser={onSelectUser}
                                onRemoveUser={onRemoveUser}
                                options={options}
                                usersList={usersList}
                            />
                            <br />
                            <br />
                            {!existingUser && (
                                <div>
                                    <Typography
                                        component={Link}
                                        to="/user/login"
                                        variant="subtitle1"
                                        color="secondary"
                                    >
                                        Already have account? Login
                                    </Typography>
                                </div>
                            )}
                        </form>
                    </section>
                )}
            </Container>
        </>
    );
};

export default ShopTeamAdd;
