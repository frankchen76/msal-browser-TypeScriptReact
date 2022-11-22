import { createContext } from "react";

export class SettingService {
    constructor(public name: string,
        private onSettingServiceUpdateCallback: (settingService: SettingService) => void) {

    }

    public updateName(name: string) {
        this.name = name;
        if (this.onSettingServiceUpdateCallback) {
            this.onSettingServiceUpdateCallback(this);
        }
    }
}
export interface SettingServiceContextProps {
    settingService: SettingService;
}
export const SettingServiceContext = createContext<SettingServiceContextProps>(null);
