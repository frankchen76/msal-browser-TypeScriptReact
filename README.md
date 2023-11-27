# TypeScriptReact-MSAL

This is a sample to demonstrate how to use msal-browser with a TypeScript+React application. 

## Setup the project
* Create Azure AD Application
* In order to test Grapph API /me endpoint, you need to configure your AAD App to have "User.Read" permssion
* Update AAD configuration from src/authConfig.ts and replace the following items: 

```Typescript
export const msalConfig: Configuration = {
    auth: {
        clientId: "[client-id]",
        // use "common" if it's multi-tenant, otherwise use tenant id 
        authority: "https://login.microsoftonline.com/[tenant-id or common]",
        // authority: "https://login.microsoftonline.com/common",
        // include redirectUri if it's not current URL
        // redirectUri: "https://localhost:8080"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};
```
## Building the code
* Run `npm install` to install npm packages. 
* Run the following command to compile the code and start a local webpack-dev-server: 
```command
npm run start
```
* you can open up a default browser to access  https://localhost:8080/
* if you want to start a browser after compile, replace `"start": "webpack-dev-server --https --hot --inline"` to `"start": "webpack-dev-server --https --hot --inline --open"`

## History
* 1.0.2
  * fixed @types/react version mismatch issues. 
  * integrated with GitHub Action with Azure Web App deployment
* 1.0.1
  * Upgraded msal v2.32.0