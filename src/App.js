import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./redux/actions/users";

// import pages
import TenantCreate from "./pages/TenantCreate";
import UserCreate from "./pages/UserCreate";
import UserLogin from "./pages/UserLogin";
import Dashboard from "./pages/Dashboard";
import AddTeam from "./pages/AddTeam";
import Shops from "./pages/Shops";
import ShopCreate from "./pages/ShopCreate";
import ViewShop from "./pages/ViewShop";
import ShopTeamAdd from "./pages/ShopTeamAdd";
import ShopEdit from "./pages/ShopEdit";
import ViewTeam from "./pages/ViewTeam";
import EditPermission from "./pages/EditPermission";

function App() {
    const dispatch = useDispatch();
    if (localStorage.getItem("currentLogIn")) {
        let data = localStorage.getItem("currentLogIn");
        data = JSON.parse(data);
        dispatch(
            userLogin({
                user: data.user,
                tenantId: data.tenantId,
            })
        );
    }
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <div style={{ margin: "auto", textAlign: "center" }}>
                        <h1>Welcome to Team Features</h1>
                        <Link to="/tenant/create">Create New Tenant</Link>
                        <br />
                        <Link to="/user/login">Login</Link>
                    </div>
                </Route>
                <Route exact path="/tenant/create">
                    <TenantCreate />
                </Route>
                <Route exact path="/shops/view/:shopId">
                    <ViewShop />
                </Route>
                <Route exact path="/shop/edit/:shopId">
                    <ShopEdit />
                </Route>
                <Route exact path="/shop/delete/:shopId">
                    <ViewShop />
                </Route>
                <Route exact path="/:tenantId/shops">
                    <Shops />
                </Route>
                <Route exact path="/tenant/:tenantId/shop/add">
                    <ShopCreate />
                </Route>
                <Route exact path="/user/create">
                    <UserCreate addUser={false} />
                </Route>
                <Route exact path="/user/login">
                    <UserLogin />
                </Route>
                <Route exact path="/dashboard/:id">
                    <Dashboard />
                </Route>
                <Route exact path="/:id/addTeam">
                    <AddTeam addUser={true} />
                </Route>
                <Route exact path="/tenant/:tenantId/team/add">
                    <UserCreate addUser={true} />
                </Route>
                <Route exact path="/shop/:shopId/team/addUser">
                    <ShopTeamAdd existingUser={true} />
                </Route>
                <Route exact path="/shop/:shopId/team/createUser">
                    <UserCreate createNewUser={true} />
                </Route>
                <Route exact path="/shop/:shopId/viewTeam">
                    <ViewTeam />
                </Route>
                <Route exact path="/shop/:shopId/userPermission/:userId/edit">
                    <EditPermission />
                </Route>
            </Switch>
        </div>
    );
}
export default App;
