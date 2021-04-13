import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";

const AddExistingUser = ({
    name,
    email,
    handleChange,
    addExistingUser,
    existingUser,
    onSelectPermission,
    onRemovePermission,
    onSelectUser,
    onRemoveUser,
    options,
    usersList,
}) => {
    let history = useHistory();
    return (
        <>
            {/* <TextField
                label="Name"
                id="name"
                name="name"
                value={name}
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
                label="Pasword"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
            />
            <br /> */}
            <br />
            {/* USER SELECTION */}
            <Multiselect
                options={usersList} // Options to display in the dropdown
                // selectedValues={selectedValue} // Preselected value to persist in dropdown
                onSelect={onSelectUser} // Function will trigger on select event
                onRemove={onRemoveUser} // Function will trigger on remove event
                displayValue="email" // Property name to display in the dropdown options
                placeholder="Select Users"
            />
            <br />
            <br />

            {/* PERMISSION SELECTION */}
            <Multiselect
                options={options} // Options to display in the dropdown
                // selectedValues={selectedValue} // Preselected value to persist in dropdown
                onSelect={onSelectPermission} // Function will trigger on select event
                onRemove={onRemovePermission} // Function will trigger on remove event
                displayValue="permission" // Property name to display in the dropdown options
                placeholder="Select Permissions"
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
                onClick={addExistingUser}
            >
                {existingUser ? "Add User" : "Create User"}
            </Button>
        </>
    );
};

export default AddExistingUser;
