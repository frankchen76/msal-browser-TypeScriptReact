import { useIsAuthenticated, useAccount, useMsal } from "@azure/msal-react";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import * as React from "react";
import { useContext } from "react";
import {
    Link
} from "react-router-dom";
import { SettingServiceContext } from "../services/ServiceContext";
import { appInsights } from "../services/ApplicationInsights";
import { Stack } from "@fluentui/react";
import { WelcomeName } from "./WelcomeName";
import { SignInSignOutButton } from "./SignInSignOutButton";

export interface IHeaderProps {
    account?: string;
}

export const LoginHeader = () => {
    const fixStyle: React.CSSProperties = {
        "overflow": "hidden",
        "position": "fixed",
        "top": 0

    };
    return (
        <div>
            <Stack horizontal horizontalAlign="space-evenly" style={fixStyle}>
                <WelcomeName />
                <SignInSignOutButton />
            </Stack>
        </div>
    );
}

export const Header = () => {
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    const ai = useAppInsightsContext();
    const serviceContext = useContext(SettingServiceContext);

    //const account=useAccount()
    const customStyle = {
        "display": "inline",
        "listStyleType": "none"
    };
    console.log("accounts", accounts);
    if (isAuthenticated && accounts != null) {
        appInsights.setAuthenticatedUserContext(accounts[0].username, accounts[0].username);
    }
    return (
        <div>
            <ul className="ms-Grid-row" style={customStyle} >
                <li className="ms-Grid-col">
                    <Link to="/">Home</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/about">About</Link>
                </li>
                <li className="ms-Grid-col">
                    {/* <Link to="/user/1">User 1</Link> */}
                    <a href="#/user/pod8/1">User 1</a>
                </li>
                <li className="ms-Grid-col">
                    {/* <Link to="/user/2">User 2</Link> */}
                    <a href="#/user/pod8/2">User 2</a>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/uploadfile">UploadFile</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/newuser">Create a User</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/detailform">DetailList</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/detailform1">DetailList1</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/rendertest">RenderTest</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/quilltest">Quill Test</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/webchat">Web Chat</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/ContextHookView">ContextHook</Link>
                </li>
                <li className="ms-Grid-col">
                    <Link to="/userform2">UserForm2</Link>
                </li>
            </ul>
            <div>{accounts[0].username}</div>
            <div>Header Service Name: {serviceContext.settingService.name}</div>
        </div>
    );
}
export class Header2 extends React.Component<IHeaderProps, {}> {
    render() {
        const customStyle = {
            "display": "inline",
            "list-style-type": "none"
        };
        return (
            <div>
                <ul className="ms-Grid-row" style={customStyle} >
                    <li className="ms-Grid-col">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="ms-Grid-col">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="ms-Grid-col">
                        <Link to="/users">Users</Link>
                    </li>
                    <li className="ms-Grid-col">
                        <Link to="/uploadfile">UploadFile</Link>
                    </li>
                    <li className="ms-Grid-col">
                        <Link to="/newuser">Create a User</Link>
                    </li>
                    <li className="ms-Grid-col">
                        <Link to="/detailform">DetailList</Link>
                    </li>
                </ul>
                <div>{this.props.account}</div>
            </div>
        );
    }
}