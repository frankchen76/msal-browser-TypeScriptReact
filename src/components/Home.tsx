import * as React from "react";
import { useEffect, useState } from "react";
import { JsonOutput } from "./JsonOutput";
import { PrimaryButton, Spinner, loadTheme, Stack } from "@fluentui/react";
import { useMsal } from "@azure/msal-react";
import { loginRequest, tokenRequestCouponAPI, tokenRequestCouponAPI_626552 } from "../authConfig";
import { callMsGraph } from "../graph";
import { AccountInfo } from "@azure/msal-browser";
import { CouponService } from "../services/CouponService";
import { AppInsightsErrorBoundary, useAppInsightsContext, useTrackEvent, useTrackMetric } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "../services/ApplicationInsights";

interface IHomeState {
    loading: boolean;
    jsonObj: any;
}

export const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [jsonObj, setJsonObj] = useState<object>(null);
    const { instance, accounts } = useMsal();
    const [count, setCount] = useState<number>(0);

    const ai = useAppInsightsContext();
    const trackComponent = useTrackMetric(ai, "Home");
    const trackButtonClick = useTrackEvent(ai, "ApplicationInsights button click", count);

    // useEffect(() => {

    //     trackComponent();
    // }, []);
    // const metricData: IMetricTelemetry = {
    //     average: engagementTime,
    //     name: "React Component Engaged Time (seconds)",
    //     sampleCount: 1
    //   };
    // const additionalProperties = { "Component Name": 'MyComponent' };
    // ai.trackMetric(metricData, additionalProperties);
    trackComponent();

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

    };
    const _getMyEmailHandler = async (): Promise<void> => {
        //alert("hello");
        setLoading(true);

    };
    const _getAllGroupsHandler = async (): Promise<void> => {
        //alert("hello");
        setLoading(true);

    };
    const _getCouponsHandler = async (): Promise<void> => {
        setLoading(true);
        // const token = await instance.acquireTokenSilent({
        //     ...tokenRequestSPO,
        //     account: accounts[0] as AccountInfo
        // });
        const token = await instance.acquireTokenPopup({
            //...tokenRequestCouponAPI,
            ...tokenRequestCouponAPI_626552,
            account: accounts[0] as AccountInfo
        });
        console.log(token.accessToken);
        const couponService = new CouponService();
        const couponItems = await couponService.getCoupons(token.accessToken);
        setJsonObj(couponItems);
        setLoading(false);

    };
    const _getCouponsMeHandler = async (): Promise<void> => {
        setLoading(true);
        // const token = await instance.acquireTokenSilent({
        //     ...tokenRequestSPO,
        //     account: accounts[0] as AccountInfo
        // });
        const token = await instance.acquireTokenPopup({
            //...tokenRequestCouponAPI,
            ...tokenRequestCouponAPI_626552,
            account: accounts[0] as AccountInfo
        });
        console.log(token.accessToken);
        const couponService = new CouponService();
        const couponItems = await couponService.getMe(token.accessToken);
        setJsonObj(couponItems);
        setLoading(false);

    };
    const _onAppInsightTrackErrorTest = () => {
        try {
            const a = 10 / 2;
            throw "exception test";
        } catch (error) {
            ai.trackException(error, { userId: accounts[0].username, component: "Home", "method": "_onAppInsightTrackErrorTest" })
        }
    };
    const _onAppInsightTrackEventTest = () => {
        const c = count + 1;
        setCount(c);
        trackButtonClick(0);
    };

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
                    <PrimaryButton text="ApplicationInsights Track Event test" onClick={_onAppInsightTrackEventTest} />
                    <PrimaryButton text="ApplicationInsights Error test" onClick={_onAppInsightTrackErrorTest} />
                    <PrimaryButton text="Get Coupons" onClick={_getCouponsHandler} />
                    <PrimaryButton text="Get Coupons me" onClick={_getCouponsMeHandler} />
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