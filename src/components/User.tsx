import * as React from "react";
import { PrimaryButton, Spinner, loadTheme } from "@fluentui/react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useAppInsightsContext, useTrackMetric } from "@microsoft/applicationinsights-react-js";
import { useEffect } from "react";


export interface IUserProps {
    // routeProps: RouteComponentProps;
    id?: string;
};
export const User = (props: IUserProps) => {
    const ai = useAppInsightsContext();
    const trackComponent = useTrackMetric(ai, "User");

    const para = useParams();
    const id: number = +para["id"];

    useEffect(() => {
        trackComponent();
    }, []);

    const _testHandler = () => {

    };
    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <h2>User {id}</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    this is user page.
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <PrimaryButton text="Test" onClick={_testHandler} />
                </div>
            </div>
        </div>

    );
};
// export class User extends React.Component<{}, {}> {
//     private _testHandler() {

//     }

//     render() {
//         return (
//             <div className="ms-Grid">
//                 <div className="ms-Grid-row">
//                     <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
//                         <h2>User</h2>
//                     </div>
//                 </div>
//                 <div className="ms-Grid-row">
//                     <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
//                         this is user page.
//                     </div>
//                     <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
//                         <PrimaryButton text="Test" onClick={this._testHandler.bind(this)} />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }