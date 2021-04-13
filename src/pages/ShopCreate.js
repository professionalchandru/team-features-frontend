import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";
import ShopCreateForm from "../components/ShopCreateForm";
import { useDispatch, useSelector } from "react-redux";
// import { shopCreate } from "../redux/actions/shops";
import PersistentDrawerLeft from "../components/Drawer";

const ShopCreate = () => {
    const [shop, setShop] = useState({
        userId: 0,
        type: "",
        email: "",
        domain: "",
        tenantId: 0,
        shopName: "",
    });
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [options, setOptions] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);
    const userId = useSelector((state) => state.isLoggedInReducer.user.id);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setShop({ ...shop, [name]: value });
    };

    const createShop = async (e) => {
        e.preventDefault();
        if (
            shop.type &&
            shop.email &&
            shop.domain &&
            shop.shopName &&
            tenantId &&
            userId
        ) {
            let registerCredentials = {
                type: shop.type,
                email: shop.email,
                domain: shop.domain,
                shopName: shop.shopName,
                tenantId,
                userId,
            };
            setIsError(false);
            setError("");
            setIsSuccess(false);
            setSuccess("");
            let response = await axios
                .post(`${baseUrl}/shops/create`, registerCredentials)
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
                //     shopCreate({
                //         shopId: response.data.data.id,
                //         shopName: response.data.data.name,
                //         email: response.data.data.email,
                //         shopType: response.data.data.shopType,
                //         tenantId,
                //     })
                // );
                history.goBack();
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
                        Add Shop
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
                        <ShopCreateForm
                            {...shop}
                            handleChange={handleChange}
                            createShop={createShop}
                        />
                    </form>
                </section>
            </Container>
        </>
    );
};

export default ShopCreate;
