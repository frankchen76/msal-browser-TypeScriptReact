import * as React from "react";
import { useState } from "react";
import { About } from "./About";
import { User } from "./User";
import { UserForm } from "./UserForm";
import { DetailForm } from "./DetailForm";
import { Home } from "./Home";
import { Header } from "./Header";
import {
    BrowserRouter,
    HashRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { PrimaryButton } from "@fluentui/react";
import { loginRequest } from "../authConfig";
import { callSPOWeb } from "../graph";
import { AccountInfo } from "@azure/msal-browser";

// interface IMainProps {
//     account?: Account;
// }
export const Main = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const style = {
        maxWidth: "400px",
        margin: "auto"
    };
    const _loginHandler = () => {
        instance.loginRedirect(loginRequest).catch(e => { console.log(e); });
    }
    return (
        <div>
            <AuthenticatedTemplate>
                <HashRouter>
                    <div className="ms-Grid" style={style}>
                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <Header />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <Switch>
                                    <Route path="/about">
                                        <About />
                                    </Route>
                                    <Route path="/users">
                                        <User />
                                    </Route>
                                    <Route path="/newuser">
                                        <UserForm />
                                    </Route>
                                    <Route path="/detailform">
                                        <DetailForm title="Issue" />
                                    </Route>
                                    <Route path="/rendertest" render={() => <div>Render Test</div>} />
                                    <Route path="/">
                                        <Home />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </HashRouter>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
                <PrimaryButton text="Login" onClick={_loginHandler} />
            </UnauthenticatedTemplate>
        </div>
    );
}

