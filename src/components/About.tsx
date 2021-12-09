import * as React from "react";

export class About extends React.Component<{}, {}> {
    render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <h2>About</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        this is about page.
                    </div>
                </div>
            </div>
        );
    }
}