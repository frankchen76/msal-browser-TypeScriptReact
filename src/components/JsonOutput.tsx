import * as React from "react";

interface JsonOutputProps {
    jsonObj: any;
}

export class JsonOutput extends React.Component<JsonOutputProps, {}> {

    public render() {
        return (
            <pre >{JSON.stringify(this.props.jsonObj, null, 4)}</pre>
        );
    }
}