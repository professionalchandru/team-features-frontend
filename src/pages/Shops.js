import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Divider } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/users";
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";
import ShopTable from "../components/ShopsTable";
import AddIcon from "@material-ui/icons/Add";

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

export default function Shops() {
    const classes = useStyles();
    const [tenant, setTenant] = useState({});
    const [shops, setShops] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.isLoggedInReducer.user);
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);
    let userPermissions = useSelector(
        (state) => state.isLoggedInReducer.user.permission
    );

    const getShops = async () => {
        let shopsArray = await axios.get(
            `${baseUrl}/${tenantId}/user/${userDetails.id}/shops/`
        );
        if (shopsArray) {
            setShops(shopsArray.data.data);
        }
    };

    const getTenantDetails = async () => {
        let tenantDetails = await axios.get(`${baseUrl}/tenants/${tenantId}`);
        if (tenantDetails) {
            setTenant((oldState) => {
                return { ...oldState, ...tenantDetails.data.data };
            });
        }
    };

    const addShop = async () => {
        history.push(`/tenant/${tenantId}/shop/add`);
    };

    const logOut = () => {
        dispatch(userLogout());
        history.push(`/user/login`);
    };

    useEffect(() => {
        getTenantDetails();
    }, [tenantId]);

    useEffect(() => {
        getShops();
    }, []);

    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <section>
                    <Typography
                        variant="h4"
                        component="h4"
                        style={{ float: "left", margin: "10px" }}
                        color="textSecondary"
                    >
                        Shops
                    </Typography>
                    {userPermissions.hasOwnProperty("Add Shop") && (
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ float: "right", margin: "10px" }}
                            onClick={addShop}
                        >
                            <AddIcon /> &nbsp; Add Shop
                        </Button>
                    )}
                </section>
                <main>{shops && <ShopTable shops={shops} />}</main>
            </Container>
        </>
    );
}
