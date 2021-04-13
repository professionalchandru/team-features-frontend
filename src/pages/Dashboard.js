import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Divider } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/users";
import baseUrl from "../services/apiService";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersistentDrawerLeft from "../components/Drawer";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: "60%",
        margin: "auto",
        paddingLeft: "20px",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 30,
        textTransform: "uppercase",
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Dashboard() {
    const classes = useStyles();
    const { id } = useParams();
    const [tenant, setTenant] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.isLoggedInReducer.user);
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);
    const permissions = Object.values(userDetails.permission);

    const getTenantDetails = async (id) => {
        let tenantDetails = await axios.get(`${baseUrl}/tenants/${id}`);
        if (tenantDetails) {
            setTenant((oldState) => {
                return { ...oldState, ...tenantDetails.data.data };
            });
        }
    };

    const addTeam = async (tenantId) => {
        history.push(`/tenant/${tenantId}/team/add`);
    };

    const logOut = () => {
        dispatch(userLogout());
        history.push(`/user/login`);
    };

    useEffect(() => {
        getTenantDetails(id);
    }, [id]);

    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <main>
                    <Card className={classes.root}>
                        <CardContent>
                            <IconButton
                                style={{
                                    float: "left",
                                    color: "black",
                                }}
                                variant="contained"
                                onClick={() => history.goBack()}
                            >
                                <KeyboardBackspaceIcon />
                            </IconButton>
                            <Typography
                                className={classes.title}
                                color="primary"
                                gutterBottom
                                variant="caption"
                            >
                                {tenant.tenantName}
                            </Typography>
                            {/* {userDetails.userType === "owner" && (
                                <Button
                                    style={{ float: "right" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addTeam(tenantId)}
                                >
                                    Add Team
                                </Button>
                            )} */}
                            <Typography variant="subtitle2" componenet="p">
                                {tenant.tenantDescription}
                            </Typography>

                            <Divider />

                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    User Name:{" "}
                                </span>
                                {userDetails.name}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    User Email:{" "}
                                </span>
                                {userDetails.email}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    User Type:{" "}
                                </span>
                                {userDetails.userType}
                            </Typography>

                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Permissions:{" "}
                                </span>
                                {permissions.map((x) => `${x} `)}
                            </Typography>

                            <Divider />

                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                variant="subtitle2"
                                component="p"
                            >
                                Tenant Created At: {tenant.createdAt}
                            </Typography>
                            {tenant.updatedAt && (
                                <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                    variant="subtitle2"
                                    component="p"
                                >
                                    Last Updated At: {tenant.updatedAt}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </Container>
        </>
    );
}
