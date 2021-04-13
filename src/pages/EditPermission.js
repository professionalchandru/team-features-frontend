import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";
import { Multiselect } from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from "../redux/actions/users";
import permissions from "../utils/permissionConstants";

const EditPermission = () => {
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [options, setOptions] = useState([]);
    const history = useHistory();
    const { shopId, userId } = useParams();
    const dispatch = useDispatch();
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);
    const [user, setUser] = useState({});
    const [selectedValues, setSelectedValues] = useState([]);

    const getUserPermission = async () => {
        let response = await axios.get(`${baseUrl}/tenant-users/${userId}`);
        if (response) {
            setUser(response.data.permission);
            let keys = Object.keys(response.data.permission);
            let preSelected = permissions.filter((option) => {
                return keys.find((key) => option.permission == key);
            });
            setSelectedValues(preSelected);
        }
    };

    useEffect(() => {
        setOptions(permissions);
    }, []);

    useEffect(() => {
        getUserPermission();
    }, [userId]);

    function onSelect(selectedList, selectedItem) {
        setUser({ permission: selectedList });
        // setPermissions([...selectedList]);
    }

    function onRemove(selectedList, removedItem) {
        setUser({ permission: selectedList });
    }

    const updatePermission = async (e) => {
        e.preventDefault();
        if (user.permission.length) {
            let registerCredentials = {
                permission: user,
                tenantId,
                shopId,
                userId,
            };
            console.log(registerCredentials);
            setIsError(false);
            setError("");
            setIsSuccess(false);
            setSuccess("");
            let response = await axios
                .patch(
                    `${baseUrl}/tenant-users/permission/${userId}`,
                    registerCredentials
                )
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
                        Change Permission
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
                        <Multiselect
                            options={options} // Options to display in the dropdown
                            selectedValues={selectedValues} // Preselected value to persist in dropdown
                            onSelect={onSelect} // Function will trigger on select event
                            onRemove={onRemove} // Function will trigger on remove event
                            displayValue="permission" // Property name to display in the dropdown options
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
                            onClick={(e) => updatePermission(e)}
                        >
                            Update Permission
                        </Button>
                    </form>
                </section>
            </Container>
        </>
    );
};

export default EditPermission;
