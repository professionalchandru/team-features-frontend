import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Divider } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";
import TeamTable from "../components/TeamTable";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

export default function Team() {
    const { shopId } = useParams();
    const [team, setTeam] = useState([]);
    const history = useHistory();
    const userDetails = useSelector((state) => state.isLoggedInReducer.user);
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);
    let userPermissions = useSelector(
        (state) => state.isLoggedInReducer.user.permission
    );

    const getTeam = async () => {
        let teamArray = await axios.get(
            `${baseUrl}/${tenantId}/shop/${shopId}/team`
        );
        if (teamArray) {
            setTeam(teamArray.data.data);
        }
    };

    useEffect(() => {
        getTeam();
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
                        <IconButton
                            style={{
                                float: "left",
                                color: "black",
                            }}
                            variant="contained"
                            onClick={() =>
                                history.push(`/shops/view/${shopId}`)
                            }
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        Team
                    </Typography>
                </section>
                <main>{team && <TeamTable team={team} />}</main>
            </Container>
        </>
    );
}
