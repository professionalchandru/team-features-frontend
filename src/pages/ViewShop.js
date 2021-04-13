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
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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

export default function ViewShop() {
    const classes = useStyles();
    const { shopId } = useParams();
    const [shop, setShop] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);
    let userPermissions = useSelector(
        (state) => state.isLoggedInReducer.user.permission
    );

    const getShopDetails = async () => {
        let shopDetails = await axios.get(`${baseUrl}/shops/${shopId}`);
        if (shopDetails) {
            setShop((oldState) => {
                return { ...oldState, ...shopDetails.data };
            });
        }
    };

    const addTeam = async (shopId) => {
        history.push(`/shop/${shopId}/team/addUser`);
    };

    const createTeam = async (shopId) => {
        history.push(`/shop/${shopId}/team/createUser`);
    };

    const handleTeamClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const viewTeam = () => {
        history.push(`/shop/${shopId}/viewTeam`);
    };

    useEffect(() => {
        getShopDetails();
    }, [shopId]);

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
                                {shop.shopName}
                            </Typography>
                            {userPermissions.hasOwnProperty("Add Team") && (
                                <div
                                    style={{
                                        float: "right",
                                        margin: "auto",
                                    }}
                                >
                                    <Button
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={(e) => handleTeamClick(e)}
                                        variant="contained"
                                        color="primary"
                                        // onClick={() => addTeam(shopId)}
                                    >
                                        <AddIcon /> &nbsp; Add Team
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem
                                            onClick={() => createTeam(shopId)}
                                        >
                                            Create New User
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => addTeam(shopId)}
                                        >
                                            Choose Existing User
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                            <Typography variant="subtitle2" componenet="p">
                                {shop.shopDescription}
                            </Typography>

                            <Divider />

                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>Type: </span>
                                {shop.type}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Email:{" "}
                                </span>
                                {shop.email}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Domain:{" "}
                                </span>
                                {shop.domain}
                            </Typography>
                            <br />
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() => viewTeam()}
                                variant="contained"
                            >
                                View Team
                            </Button>
                            <br />
                            <br />
                            <Divider />

                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                variant="subtitle2"
                                component="p"
                            >
                                Shop Created At: {Date(shop.createdAt)}
                            </Typography>
                            {shop.updatedAt && (
                                <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                    variant="subtitle2"
                                    component="p"
                                >
                                    Last Updated At: {Date(shop.updatedAt)}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </Container>
        </>
    );
}
