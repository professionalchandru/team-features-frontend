import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";
import TenantCreateForm from "../components/TenantCreateForm";
import { useDispatch, useSelector } from "react-redux";
import { tenantCreate } from "../redux/actions/tenants";

const TenantCreate = () => {
    const [tenant, setTenant] = useState({
        tenantName: "",
        accountType: "",
        settings: {},
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
        setTenant({ ...tenant, [name]: value });
    };

    const createTenant = async (e) => {
        e.preventDefault();
        if (tenant.tenantName && tenant.accountType && tenant.settings) {
            let registerCredentials = {
                tenantName: tenant.tenantName,
                accountType: tenant.accountType,
                settings: JSON.parse(tenant.settings),
            };
            setIsError(false);
            setError("");
            setIsSuccess(false);
            setSuccess("");
            let response = await axios
                .post(`${baseUrl}/tenants/register`, registerCredentials)
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
                    tenantCreate({
                        tenantId: response.data.data.id,
                        tenantName: response.data.data.tenantName,
                        accountType: response.data.data.accountType,
                        settings: response.data.data.settings,
                    })
                );
                setTimeout(() => {
                    history.push("/user/create");
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
                <section className="center-elements">
                    <Typography variant="h4" className="typo">
                        Tenant Create
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
                        <TenantCreateForm
                            {...tenant}
                            handleChange={handleChange}
                            createTenant={createTenant}
                        />
                        {/* <br />
                        <br />
                        <Typography
                            component={Link}
                            to="/user/login"
                            variant="subtitle1"
                            color="secondary"
                        >
                            Already have account? Login
                        </Typography> */}

                        {/* <br />
                        <br />
                        <Typography
                            component={Link}
                            to="/user/create"
                            variant="subtitle1"
                            color="secondary"
                        >
                            User Create
                        </Typography> */}
                    </form>
                </section>
            </Container>
        </>
    );
};

export default TenantCreate;
