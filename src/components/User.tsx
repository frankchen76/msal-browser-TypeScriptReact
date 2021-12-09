import * as React from "react";
import { PrimaryButton, Spinner, loadTheme } from "@fluentui/react";


export class User extends React.Component<{}, {}> {
    private _testHandler() {

    }

    render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <h2>User</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        this is user page.
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <PrimaryButton text="Test" onClick={this._testHandler.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}