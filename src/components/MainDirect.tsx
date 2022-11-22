import * as React from "react";
import { useState } from "react";
import { About } from "./About";
import { User } from "./User";
import { Home } from "./Home";
import { Header } from "./Header";
import {
    BrowserRouter,
    HashRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { PrimaryButton, Stack, Spinner } from "@fluentui/react";
import { loginRequest, tokenRequestSPO, tokenRequestMSGraph } from "../authConfig";
import { callSPOWeb, callGetMe, callGetMail } from "../graph";
import { AccountInfo } from "@azure/msal-browser";
import { JsonOutput } from "./JsonOutput";
import { WelcomeName } from "./WelcomeName";
import { SignInSignOutButton } from "./SignInSignOutButton";

// interface IMainProps {
//     account?: Account;
// }
export const MainDirect = () => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [graphData, setGraphData] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [jsonObj, setJsonObj] = useState<object>(null);

    const style = {
        width: "400px"
    };
    const _loginHandler = () => {
        instance.loginRedirect(loginRequest).catch(e => { console.log(e); });
    }
    const _getMeHandler = async (): Promise<void> => {
        console.log("is login?");
        console.log(accounts);
        //await instance.loginPopup(loginRequest);
        setLoading(true);
        // const token = await instance.acquireTokenSilent({
        //     ...tokenRequestSPO,
        //     account: accounts[0] as AccountInfo
        // });
        const token = await instance.acquireTokenPopup({
            ...tokenRequestMSGraph,
            account: accounts[0] as AccountInfo
        });
        console.log(token.accessToken);
        const result = await callGetMe(token.accessToken);
        setJsonObj(result);
        setLoading(false);
    }
    const _getEmailHandler = async (): Promise<void> => {
        setLoading(true);
        const token = await instance.acquireTokenSilent({
            ...tokenRequestMSGraph,
            account: accounts[0] as AccountInfo
        });
        console.log(token.accessToken);
        const result = await callGetMail(token.accessToken);
        setJsonObj(result);
        setLoading(false);

    }
    const _callSPOWebHandler = async (): Promise<void> => {
        setLoading(true);
        const token = await instance.acquireTokenSilent({
            ...tokenRequestSPO,
            account: accounts[0] as AccountInfo
        });
        console.log(token.accessToken);
        const result = await callSPOWeb(token.accessToken);
        setJsonObj(result);
        setLoading(false);

    }

    return (
        <div className="ms-Grid" style={style}>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-bgColor-white" >
                    <h5 className="card-title">Please sign-in to see your profile information.</h5>
                    <Stack horizontal horizontalAlign="space-evenly">
                        <WelcomeName />
                        <SignInSignOutButton />
                    </Stack>
                </div>
            </div>
            {isAuthenticated && <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <Stack horizontal horizontalAlign="space-around">
                        {/* <PrimaryButton text="Login" onClick={_loginHandler} /> */}
                        <PrimaryButton text="Get Me" onClick={_getMeHandler} />
                        <PrimaryButton text="Get My email" onClick={_getEmailHandler} />
                        <PrimaryButton text="Call SPO" onClick={_callSPOWebHandler} />
                    </Stack>
                </div>
            </div>}
            {jsonObj && <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {
                        loading ? <Spinner />
                            :
                            <JsonOutput jsonObj={jsonObj} />
                    }
                </div>
            </div>}
        </div>
    );
}

