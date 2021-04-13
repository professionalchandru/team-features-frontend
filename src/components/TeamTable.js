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
import { Link, useHistory, useParams } from "react-router-dom";
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

export default function TeamTable(team) {
    let permission;
    const classes = useStyles();
    const { shopId } = useParams();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const tenantId = useSelector((state) => state.isLoggedInReducer.tenantId);
    let userPermissions = useSelector(
        (state) => state.isLoggedInReducer.user.permission
    );
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const history = useHistory();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let teamArray = Object.values(team);

    const handleOpen = (userId) => {
        setId(userId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteUser = async () => {
        let userId = id;
        let deleteUser = await axios.delete(
            `${baseUrl}/${tenantId}/shops/${shopId}/delete/user/${userId}`
        );
        if (deleteUser) {
            setOpen(false);
            setId(0);
            history.push("/");
            history.push(`/shop/${shopId}/viewTeam`);
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
                            <TableCell>Eamil</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Permissions</TableCell>
                            <TableCell> Edit | Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamArray[0]
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((user, index) => {
                                {
                                    permission = Object.keys(
                                        JSON.parse(user.permission)
                                    );
                                }
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.usertype}</TableCell>
                                        <TableCell>
                                            {permission.map((x) => `${x},`)}
                                        </TableCell>
                                        <TableCell>
                                            {user.usertype !== "owner" && (
                                                <div>
                                                    {userPermissions.hasOwnProperty(
                                                        // "Edit User Permission"
                                                        "Edit Shop"
                                                    ) && (
                                                        <IconButton
                                                            component={Link}
                                                            to={`/shop/${shopId}/userPermission/${user.id}/edit`}
                                                        >
                                                            <EditIcon
                                                                style={{
                                                                    color:
                                                                        "#FFCC00",
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
                                                                handleOpen(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon color="secondary" />
                                                        </IconButton>
                                                    )}
                                                    <div>
                                                        <Dialog
                                                            open={open}
                                                            onClose={
                                                                handleClose
                                                            }
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">
                                                                {
                                                                    "Confirm Delete"
                                                                }
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Are you
                                                                    sure? You
                                                                    want to
                                                                    remove{" "}
                                                                    {user.name}{" "}
                                                                    from the
                                                                    shop?
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
                                                                        deleteUser(
                                                                            user.id
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
                                                </div>
                                            )}
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
                count={teamArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
