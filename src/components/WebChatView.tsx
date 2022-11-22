import * as React from "react";
import { DirectLine } from 'botframework-directlinejs';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { PrimaryButton, Spinner } from "@fluentui/react";
import { useContext, useEffect, useState } from "react";
import { SettingServiceContext } from "../services/ServiceContext";
import { useMsal } from "@azure/msal-react";
import { tokenRequestWebBot } from "../authConfig";
import { AccountInfo } from "@azure/msal-browser";
import { WebBotService } from "../services/WebBotService";

export const WebChatView = () => {
    const { instance, accounts } = useMsal();
    const [loading, setLoading] = useState<boolean>(false);
    const [directLine, setDirectLine] = useState<DirectLine>();
    const [botToken, setBotToken] = useState<string>();
    const [userId, setUserId] = useState<string>();

    //const directLine = new DirectLine({ token: "ew0KICAiYWxnIjogIlJTMjU2IiwNCiAgImtpZCI6ICJ2cG4yYXhuRjFSU3NHUXg5aXd0WGEwZTNjRWciLA0KICAieDV0IjogInZwbjJheG5GMVJTc0dReDlpd3RYYTBlM2NFZyIsDQogICJ0eXAiOiAiSldUIg0KfQ.ew0KICAiYm90IjogIkJvdC1RbkFUZXN0MDEiLA0KICAic2l0ZSI6ICJDX3VEaFoyZndtTSIsDQogICJjb252IjogIjdSeUEwUHFvM1p5Q2xpTzJ1NnVBWnctdXMiLA0KICAibmJmIjogMTY0NzM4NTk2MywNCiAgImV4cCI6IDE2NDczODk1NjMsDQogICJpc3MiOiAiaHR0cHM6Ly9kaXJlY3RsaW5lLmJvdGZyYW1ld29yay5jb20vIiwNCiAgImF1ZCI6ICJodHRwczovL2RpcmVjdGxpbmUuYm90ZnJhbWV3b3JrLmNvbS8iDQp9.FC9DUrwLte_VHGI6r3MaWjYxccuRN-2oogLkbaegcUtLTq6vd1Ez0ljFrOUiVBwR9m5eWmctJxvxUK9r_dLSFwRyBtN3MBi0Qd7Wn5VGwJ_AutKGEarQFjoQmytdTtvY9DYrC_q3YPktndN-XUkiIvGG-VSoGvdbrmnCvPsz2P-LlhySTyTpoMlQy4Y-UIVmcWUAjmG5y01CV7EX_ckuCrJUnTSTgArjC0Qs_vJsr4cDRHN9_iAVd9QUW1EcxIvN15PVujZjtuZvhQ-RqtR1tiw3wn7pCzct1xwc6Oh2RkkMz3zLMmd4-0xteQlg2kvrGOSRMY-9quqayuPgDby-tg" });
    // const directLine = new DirectLine({
    //     secret: "C_uDhZ2fwmM.2pAmubs_bWTnHFSNIytKgQqY5ovVymHKrpFh6eDy5QI"
    //     // conversationId: "7RyA0Pqo3ZyCliO2u6uAZw-us"
    // });
    console.log(directLine);
    const serviceContext = useContext(SettingServiceContext);

    const onUpdateServiceNameHandler = () => {
        serviceContext.settingService.updateName("hello");
    };
    useEffect(() => {
        const loadBotToken = async () => {
            setLoading(true);
            // const token = await instance.acquireTokenSilent({
            //     ...tokenRequestSPO,
            //     account: accounts[0] as AccountInfo
            // });
            const token = await instance.acquireTokenPopup({
                ...tokenRequestWebBot,
                account: accounts[0] as AccountInfo
            });
            console.log(token.accessToken);
            const webBotService = new WebBotService();
            const botToken = await webBotService.getBotToken(token.accessToken);
            setBotToken(botToken.token);
            setDirectLine(new DirectLine({
                token: botToken.token
            }));
            setUserId(botToken.userId);
            setLoading(false);
        };

        loadBotToken();
        // setBotToken("ew0KICAiYWxnIjogIlJTMjU2IiwNCiAgImtpZCI6ICJ2cG4yYXhuRjFSU3NHUXg5aXd0WGEwZTNjRWciLA0KICAieDV0IjogInZwbjJheG5GMVJTc0dReDlpd3RYYTBlM2NFZyIsDQogICJ0eXAiOiAiSldUIg0KfQ.ew0KICAiYm90IjogIkJvdC1RbkFUZXN0MDEiLA0KICAic2l0ZSI6ICJJUmlmVGg5Zi1MTSIsDQogICJjb252IjogIkJEZHVhWVc4SVB6M2pad1VzM3phY3YtdXMiLA0KICAidXNlciI6ICJkbF9BN0UyQTNDNy03OThCLTRFQ0YtQUVGNy1BMEFDRjlDRTY0ODciLA0KICAibmJmIjogMTY1MTEyOTIyOSwNCiAgImV4cCI6IDE2NTExMzI4MjksDQogICJpc3MiOiAiaHR0cHM6Ly9kaXJlY3RsaW5lLmJvdGZyYW1ld29yay5jb20vIiwNCiAgImF1ZCI6ICJodHRwczovL2RpcmVjdGxpbmUuYm90ZnJhbWV3b3JrLmNvbS8iDQp9.DFFhaiLO4RQwG2ldZm2ZmhQeUlk5Db8KHOpfeOea76c44Z-KdZB5d2DD8jOt8SW_RJ9UTxFHW5yeu3qHDqgC7hlg1eVKRAsh-_qqZLiwtP179cWvLhvgFlr06vAacuShDqCPYiykexFw1v9JgvvuHfJjRY46AkUAKnO8BM3dDZSqK3v_eHSPKut8oIzhwrWBSwnb6HGo9QVQmyrJFIJ9DIBB2dq7nvFHGItvu_Q1nCBoG5iSfzU0LrP52RM5Zz8dUPnfZo9sVDL2UOa4V-QQm5ytNBHsOHWDza1t_u4EeJ4sH_BdBlWDbtKW4IUin0iGNhJAXLiEpSboo5xehNbxsA");
        // setDirectLine(new DirectLine({
        //     token: "ew0KICAiYWxnIjogIlJTMjU2IiwNCiAgImtpZCI6ICJ2cG4yYXhuRjFSU3NHUXg5aXd0WGEwZTNjRWciLA0KICAieDV0IjogInZwbjJheG5GMVJTc0dReDlpd3RYYTBlM2NFZyIsDQogICJ0eXAiOiAiSldUIg0KfQ.ew0KICAiYm90IjogIkJvdC1RbkFUZXN0MDEiLA0KICAic2l0ZSI6ICJJUmlmVGg5Zi1MTSIsDQogICJjb252IjogIkJEZHVhWVc4SVB6M2pad1VzM3phY3YtdXMiLA0KICAidXNlciI6ICJkbF9BN0UyQTNDNy03OThCLTRFQ0YtQUVGNy1BMEFDRjlDRTY0ODciLA0KICAibmJmIjogMTY1MTEyOTIyOSwNCiAgImV4cCI6IDE2NTExMzI4MjksDQogICJpc3MiOiAiaHR0cHM6Ly9kaXJlY3RsaW5lLmJvdGZyYW1ld29yay5jb20vIiwNCiAgImF1ZCI6ICJodHRwczovL2RpcmVjdGxpbmUuYm90ZnJhbWV3b3JrLmNvbS8iDQp9.DFFhaiLO4RQwG2ldZm2ZmhQeUlk5Db8KHOpfeOea76c44Z-KdZB5d2DD8jOt8SW_RJ9UTxFHW5yeu3qHDqgC7hlg1eVKRAsh-_qqZLiwtP179cWvLhvgFlr06vAacuShDqCPYiykexFw1v9JgvvuHfJjRY46AkUAKnO8BM3dDZSqK3v_eHSPKut8oIzhwrWBSwnb6HGo9QVQmyrJFIJ9DIBB2dq7nvFHGItvu_Q1nCBoG5iSfzU0LrP52RM5Zz8dUPnfZo9sVDL2UOa4V-QQm5ytNBHsOHWDza1t_u4EeJ4sH_BdBlWDbtKW4IUin0iGNhJAXLiEpSboo5xehNbxsA"
        // }));
        // setUserId("dl_A7E2A3C7-798B-4ECF-AEF7-A0ACF9CE6487");

        setInterval(() => {
            const intervalFn = async () => {
                const token = await instance.acquireTokenSilent({
                    ...tokenRequestWebBot,
                    account: accounts[0] as AccountInfo
                });
                const webBotService = new WebBotService();
                const botToken = await webBotService.getBotToken(token.accessToken);
                setBotToken(botToken.token);
                console.log("retrieve token: ", botToken.token);
            };
            intervalFn();
        }, 1800000);
    }, []);
    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <h2>Web Chat</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <PrimaryButton text="Update Service Name" onClick={onUpdateServiceNameHandler} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    {/* {directLine ? <ReactWebChat directLine={directLine} userID={userId} /> : <Spinner />} */}
                    {directLine ? <ReactWebChat directLine={createDirectLine({ token: botToken })} userID={userId} username={"frank@m365x725618.onmicrosoft.com"} /> : <Spinner />}
                </div>
            </div>

        </div>
    );
};