/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Configuration, LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig: Configuration = {
    auth: {
        // single tenant m365x725618 TypeScriptReactMSAL2.0
        clientId: "7a417ade-0ade-494e-9bdb-01f369ce8836",
        authority: "https://login.microsoftonline.com/8a5ee357-7de0-4836-ab20-9173b12cdce9",

        // multi-tenant common SPFxWorkshop.CouponAPI from M365x725618
        // clientId: "4dbe5736-bf2c-4efe-8d36-ec1afb4ebf94",
        // authority: "https://login.microsoftonline.com/common",

        // multi-tenant common TestReactSPA from EZCode.org 
        // clientId: "f2df46c1-9c26-4387-adb2-481e0ed74927",
        // authority: "https://login.microsoftonline.com/common",
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

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
// export const loginRequest = {
//     scopes: ["User.Read"]
// };
export const loginRequest = {
    scopes: ["openid", "profile", "User.Read", "Mail.Read"]
};
export const tokenRequestSPO = {
    // scopes: ["AllSites.Read", "Sites.Search.All"]
    scopes: ["https://m365x725618.sharepoint.com/.default"]
};
export const tokenRequestMSGraph = {
    // scopes: ["AllSites.Read", "Sites.Search.All"]
    scopes: ["https://graph.microsoft.com/.default"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMail: "https://graph.microsoft.com/v1.0/me/messages"
};
export const spoConfig = {
    webEndpoint: "https://m365x725618.sharepoint.com/sites/FrankCommunication1/_api/web"
};
