import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const TenantCreateForm = ({
    tenantName,
    accountType,
    settings,
    handleChange,
    createTenant,
}) => {
    let history = useHistory();
    return (
        <>
            <TextField
                label="Name"
                id="tenantName"
                name="tenantName"
                value={tenantName}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Account Type"
                id="accountType"
                name="accountType"
                value={accountType}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Settings"
                type="text"
                id="settings"
                name="settings"
                value={settings}
                onChange={handleChange}
            />
            <br />
            {/* {!edit && (
                <div>
                    <span>
                        <label htmlFor="projectId">Select Project</label>
                    </span>
                    <br />
                    <select
                        value={newProjects.id}
                        name="projectId"
                        id="projectId"
                        onClick={handleChange}
                        style={{ width: "200px" }}
                    >
                        {newProjects.map((project) => {
                            return (
                                <option value={project.id} key={project.id}>
                                    {project.projectName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            )} */}

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
                onClick={createTenant}
            >
                Create Tenant
            </Button>
        </>
    );
};

export default TenantCreateForm;
