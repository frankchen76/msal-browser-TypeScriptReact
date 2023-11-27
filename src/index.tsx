import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "./components/Main";
import { MainDirect } from "./components/MainDirect";
import { initializeIcons } from "@fluentui/react";
import { AuthenticationResult, EventMessage, EventType, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);
// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);
        console.log("addEventCallback");
        console.log(event);
    }
});
initializeIcons();

ReactDOM.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <Main />
            {/* <MainDirect /> */}
        </MsalProvider>
    </React.StrictMode>,
    document.getElementById("example")

);
