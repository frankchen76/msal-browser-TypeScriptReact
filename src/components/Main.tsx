import * as React from "react";
import { useEffect, useState } from "react";
import { About } from "./About";
import { User } from "./User";
import { UserForm1 } from "./UserForm1";
import { DetailForm } from "./DetailForm";
import { DetailForm1 } from "./DetailForm1";
import { QuillTestPage } from "./QuillTestPage";
import { Home } from "./Home";
import { Header, LoginHeader } from "./Header";
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
import { WebChatView } from "./WebChatView";
import { ContextHookView } from "./ContextHookView";
import { UserForm2 } from "./UserForm2";
import { SettingService, SettingServiceContext } from "../services/ServiceContext";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin, appInsights } from "../services/ApplicationInsights";

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
        //instance.loginPopup(loginRequest).catch(e => { console.log(e); });
    }
    const callback = (settingService: SettingService) => {
        SetSettingService(settingService);
    };
    const [settingService, SetSettingService] = useState<SettingService>(new SettingService("test", callback));

    // useEffect(() => {
    //     SetSettingService(new SettingService("test", callback));
    // }, []);
    console.log("Main was rendered.");
    return (
        <div>
            <AppInsightsContext.Provider value={reactPlugin}>
                <AuthenticatedTemplate>
                    <HashRouter>
                        <SettingServiceContext.Provider value={{ settingService: settingService }} >
                            <div className="ms-Grid" style={style}>
                                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                        <LoginHeader />
                                    </div>
                                </div>
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                        <Header />
                                    </div>
                                </div>
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                        Main Service Name: {settingService ? settingService.name : ""}
                                    </div>
                                </div>
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                        <Switch>
                                            <Route path="/about">
                                                <About />
                                            </Route>
                                            {/* <Route path="/users">
                                            <User />
                                        </Route> */}
                                            <Route path="/user/:settingItemId/:id" >
                                                <User />
                                            </Route>
                                            <Route path="/newuser">
                                                <UserForm1 />
                                            </Route>
                                            <Route path="/userform2">
                                                <UserForm2 />
                                            </Route>
                                            <Route path="/detailform">
                                                <DetailForm title="Issue" />
                                            </Route>
                                            <Route path="/detailform1">
                                                <DetailForm1 title="Issue" />
                                            </Route>
                                            <Route path="/rendertest" render={() => <div>Render Test</div>} />
                                            <Route path="/quilltest">
                                                <QuillTestPage />
                                            </Route>
                                            <Route path="/webchat">
                                                <WebChatView />
                                            </Route>
                                            <Route path="/ContextHookView">
                                                <ContextHookView />
                                            </Route>
                                            <Route path="/">
                                                <Home />
                                            </Route>
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </SettingServiceContext.Provider>
                    </HashRouter>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <h5 className="card-title">Please sign-in to see your profile information.</h5>
                    <PrimaryButton text="Login" onClick={_loginHandler} />
                </UnauthenticatedTemplate>
            </AppInsightsContext.Provider>
        </div>
    );
}

