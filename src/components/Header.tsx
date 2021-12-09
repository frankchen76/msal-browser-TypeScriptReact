import { useIsAuthenticated, useAccount, useMsal } from "@azure/msal-react";
import * as React from "react";
import {
    Link
} from "react-router-dom";

export interface IHeaderProps {
    account?: string;
}

export const Header = () => {
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    //const account=useAccount()
    const customStyle = {
        "display": "inline",
        "listStyleType": "none"
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
                <li className="ms-Grid-col">
                    <Link to="/rendertest">RenderTest</Link>
                </li>
            </ul>
            <div>{accounts[0].username}</div>
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