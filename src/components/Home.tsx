import * as React from "react";
import { useState } from "react";
import { JsonOutput } from "./JsonOutput";
import { PrimaryButton, Spinner, loadTheme, Stack } from "@fluentui/react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { callMsGraph } from "../graph";
import { AccountInfo } from "@azure/msal-browser";

interface IHomeState {
    loading: boolean;
    jsonObj: any;
}

export const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [jsonObj, setJsonObj] = useState<object>(null);
    const { instance, accounts } = useMsal();

    const _getMyInfoHandler = async (): Promise<void> => {
        //alert("hello");
        setLoading(true);
        const token = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0] as AccountInfo
        });
        const result = await callMsGraph(token.accessToken);
        setLoading(false);
        setJsonObj(result);
        // instance.acquireTokenSilent({
        //     ...loginRequest,
        //     account: accounts[0] as AccountInfo
        // }).then((response) => {
        //     callMsGraph(response.accessToken).then(response => setJsonObj(response));
        // });

    }
    const _getMyEmailHandler = async (): Promise<void> => {
        //alert("hello");
        setLoading(true);

    }
    const _getAllGroupsHandler = async (): Promise<void> => {
        //alert("hello");
        setLoading(true);

    }

    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-bgColor-white" >
                    <h2>Home</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    this is home page.
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <Stack horizontal horizontalAlign="space-around">
                        <PrimaryButton text="Get My Info" onClick={_getMyInfoHandler} />
                        <PrimaryButton text="Get My Email" onClick={_getMyEmailHandler} />
                        <PrimaryButton text="Get All Groups" onClick={_getAllGroupsHandler} />
                        {/* <PrimaryButton text="Change Theme" onClick={this._applyTheme.bind(this)} /> */}
                    </Stack>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {
                        loading ? <Spinner />
                            :
                            <JsonOutput jsonObj={jsonObj} />
                    }
                </div>
            </div>
        </div>
    );

}

export class Home1 extends React.Component<{}, IHomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loading: false,
            jsonObj: undefined
        };
    }
    //@autobind
    private async _getMyInfoHandler(): Promise<void> {
        //alert("hello");
        this.setState({ loading: true });

    }
    private async _getMyEmailHandler(): Promise<void> {
        //alert("hello");
        this.setState({ loading: true });

    }
    private async _getAllGroupsHandler(): Promise<void> {
        //alert("hello");
        this.setState({ loading: true });

    }
    private _testHandler2() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, jsonObj: "done" });
        }, 3000);
    }

    public render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-bgColor-white" >
                        <h2>Home</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        this is home page.
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Stack horizontal horizontalAlign="space-around">
                            <PrimaryButton text="Get My Info" onClick={this._getMyInfoHandler.bind(this)} />
                            <PrimaryButton text="Get My Email" onClick={this._getMyEmailHandler.bind(this)} />
                            <PrimaryButton text="Get All Groups" onClick={this._getAllGroupsHandler.bind(this)} />
                            {/* <PrimaryButton text="Change Theme" onClick={this._applyTheme.bind(this)} /> */}
                        </Stack>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        {
                            this.state.loading ? <Spinner />
                                :
                                <JsonOutput jsonObj={this.state.jsonObj} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}