import { string } from "yup";

export interface IBotTokenItem {
    token: string;
    userId: string;
    conversationId: string;
    expiredIn: Date;
}
export class WebBotService {
    public async getBotToken(accessToken: string): Promise<IBotTokenItem> {
        // const url = "https://localhost:7046/api/Token/57650015-0CDF-4311-BBA5-A4EB57732546";
        const url = "https://m365x725618-webbotapi.azurewebsites.net/api/Token/57650015-0CDF-4311-BBA5-A4EB57732546";
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        return fetch(url, options)
            .then(response => response.json())
            .catch(error => console.log(error));

    }
}