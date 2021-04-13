import React from "react";
import { TextField, Button, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ShopCreateForm = ({
    type,
    shopName,
    domain,
    email,
    handleChange,
    createShop,
    editShop,
    edit,
}) => {
    const classes = useStyles();
    let history = useHistory();
    return (
        <>
            <TextField
                label="Name"
                id="shopName"
                name="shopName"
                value={shopName}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Domain Name"
                id="domain"
                name="domain"
                value={domain}
                onChange={handleChange}
                placeholder="www.example.com"
            />
            <br />
            <FormControl className={classes.formControl}>
                <InputLabel id="selectType">Type</InputLabel>
                <Select
                    labelId="selectType"
                    id="type"
                    value={type}
                    onChange={handleChange}
                    name="type"
                >
                    <MenuItem value={"woocommerce"}>WooCommerce</MenuItem>
                    <MenuItem value={"shopify"}>Shopify</MenuItem>
                </Select>
            </FormControl>
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
            {edit && (
                <Button
                    className="login-btn"
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={editShop}
                >
                    Update Shop
                </Button>
            )}
            {!edit && (
                <Button
                    className="login-btn"
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={createShop}
                >
                    Add Shop
                </Button>
            )}
        </>
    );
};

export default ShopCreateForm;
