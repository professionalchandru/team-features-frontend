import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import baseUrl from "../services/apiService";
import axios from "axios";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default function ShopTable(shops) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let userPermissions = useSelector(
        (state) => state.isLoggedInReducer.user.permission
    );
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let shopsArray = Object.values(shops);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteShop = async (shopId) => {
        let deleteShop = await axios.delete(`${baseUrl}/shops/${shopId}`);
        if (deleteShop) {
            setOpen(false);
            history.push("/");
            history.push(`/${shopId}/shops`);
        }
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Domain Name</TableCell>
                            {/* <TableCell>Owner Id</TableCell> */}
                            <TableCell>Type</TableCell>
                            <TableCell>View | Edit | Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shopsArray[0]
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((shop, index) => {
                                return (
                                    <TableRow key={shop.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {shop.shopName || shop.shopname}
                                        </TableCell>
                                        <TableCell>{shop.domain}</TableCell>
                                        <TableCell>{shop.type}</TableCell>
                                        <TableCell>
                                            {userPermissions.hasOwnProperty(
                                                "View All"
                                            ) && (
                                                <IconButton
                                                    component={Link}
                                                    to={`/shops/view/${shop.id}`}
                                                >
                                                    <VisibilityIcon color="primary" />
                                                </IconButton>
                                            )}
                                            |
                                            {userPermissions.hasOwnProperty(
                                                "Edit Shop"
                                            ) && (
                                                <IconButton
                                                    component={Link}
                                                    to={`/shop/edit/${shop.id}`}
                                                >
                                                    <EditIcon
                                                        style={{
                                                            color: "#FFCC00",
                                                        }}
                                                    />
                                                </IconButton>
                                            )}
                                            |
                                            {userPermissions.hasOwnProperty(
                                                "Delete Shop"
                                            ) && (
                                                <IconButton
                                                    onClick={() =>
                                                        handleOpen(shop.id)
                                                    }
                                                >
                                                    <DeleteIcon color="secondary" />
                                                </IconButton>
                                            )}
                                            <div>
                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {
                                                            "Do you want to delete confirm?"
                                                        }
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            You cannot be able
                                                            to retrive the data
                                                            again
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() =>
                                                                handleClose()
                                                            }
                                                            color="primary"
                                                        >
                                                            Disagree
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                deleteShop(
                                                                    shop.id
                                                                );
                                                            }}
                                                            color="primary"
                                                            autoFocus
                                                        >
                                                            Agree
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={shopsArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
